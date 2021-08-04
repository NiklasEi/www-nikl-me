---
title: "Asset handling in Bevy games"
date: 2021-08-03
category: code
tags:
- gamedev
- rust
- bevy
hide: true
---

Disclaimer, no bevy intro, link to bevy, not a discussion about asset loading in the engine, but the code in bevy games; thoughts + ideas for bevy_asset_loader

## Minimalistic approach

A very first usage of assets in your Bevy game might look like this:
```rust
fn draw_the_player(
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut materials: ResMut<Assets<ColorMaterial>>,
) {
    commands.spawn_bundle(SpriteBundle {
        material: materials.add(asset_server.load("player.png").into()),
        ..SpriteBundle::default()
    });
}
```
_Loading the player texture where and when it's needed_

Here we are telling the asset server to load `rust>"player.png"` from our `assets` directory. The actual loading of the file happens asynchronously. The SpriteBundle will be in our ECS at the end of the current frame, but will not be rendered until the asset is finished loading. As soon as the handle has the state `rust>LoadState::Loaded`, our player texture will show up.

In most games there will be a lot more assets than just one player texture. Probably, we would also have heroic background music, sound effects, and some fancy font to tell a story. If we load all of those assets when we need them, most will start loading in the first frame. Some might be ready after one frame, others will take longer. If we imagine our first screen to be build from different textures, the screen will render texture for texture over some duration.  
Loading handles were and when you need them is fine for small experiments, but most of the time, you will want something more elaborate. All required assets should already be finished loading when they are used. Additionally, there should be an easy way to use the same loaded handle at different points in the code.

## Prepare all assets in a "loading" state

A common approach is to load all needed assets before starting the game. Most games have some sort of loading screen that gives them time to prepare their assets.  
We can use [states][states] in Bevy to run a certain set of systems before our actual game logic runs. If we keep the loaded asset handles in resources, systems running during later states can use them. The previous example might look like this now:

```rust
// the asset is loaded in a previous state and TextureAssets is inserted as a resource
struct TextureAssets {
   player: Handle<ColorMaterial>
}

fn draw_the_player(
    mut commands: Commands,
    texture_assets: Res<TextureAssets>,
) {
    commands.spawn_bundle(SpriteBundle {
        material: texture_assets.player.clone(),
        ..SpriteBundle::default()
    });
}
```
_Using a resource that contains the needed player material handle_

There are three parts to implementing this in Bevy. 
1. Start loading all required assets when entering the loading state
2. Check the `rust>LoadState` of all the assets on update
3. When the state of all assets is `rust>LoadState::Loaded`, add the handles to resources, insert the resources and change the state

You can find some more explanation on this in [the cookbook][loading_using_state]. 

In my first few Bevy projects I caught myself copying and pasting the code for the loading state. Apart from the code duplication between projects, there were also a few other pain points:
1. When adding new assets to an existing resource, the code had to be touched in several points
2. Adding new resources that contain asset handles required too much boilerplate
3. The paths to the assets where too far away from the resource field containing the asset handle

The first two points are about boilerplate. The third point is more about code quality and ease of understanding for me. When I see a piece of code that uses a handle from a resource, I want to be able to find the corresponding asset path as fast as possible. The easiest way would be to have the path directly at the field. This literally screams for some macro magic.

A perfect opportunity to write a Bevy plugin.

## Introducing `bevy_asset_loader`

The idea of `bevy_asset_loader` is to solve the above mentioned pain points and stop code duplication. There should be minimal boilerplate when adding new resources containing asset handles (from here on called asset collections) or adding new assets to an existing collection. At the same time, the asset path should be close to the resource field containing its handle.  
The current implementation of `bevy_asset_loader` delivers on all these points. An internal plugin that loads three asset collections during the state `rust>GameState::Loading` looks like this:
```rust{numberLines: true}
pub struct LoadingPlugin;

impl Plugin for LoadingPlugin {
    fn build(&self, app: &mut AppBuilder) {
        AssetLoader::new(GameState::Loading, GameState::Menu)
            .with_collection::<FontAssets>()
            .with_collection::<AudioAssets>()
            .with_collection::<TextureAssets>()
            .build(app);
    }
}

#[derive(AssetCollection)]
pub struct FontAssets {
    #[asset(path = "fonts/FiraSans-Bold.ttf")]
    pub fira_sans: Handle<Font>,
}

#[derive(AssetCollection)]
pub struct AudioAssets {
    #[asset(path = "audio/background.ogg")]
    pub background: Handle<AudioSource>,
    #[asset(path = "audio/lost.ogg")]
    pub lost: Handle<AudioSource>,
}

#[derive(AssetCollection)]
pub struct TextureAssets {
    #[asset(path = "textures/jar.png")]
    pub jar: Handle<Texture>,
    #[asset(path = "textures/shelf.jpg")]
    pub shelf: Handle<Texture>,
}
```
_A Bevy plugin using `bevy⎯asset⎯loader` to load three different asset collections during the state `rust>GameState::Loading`_

This works very well for assets that can be loaded directly from files. The code above also requires there to be a one-to-one relationship of files to handles.

For some use cases this is fine, but common assets like `rust>TextureAtlas` need some extra preparation steps. In Bevy, we can either build a `rust>TextureAtlas` out of many textures, or split a sprite sheet. In both cases we can load the initial textures like demonstrated above. The next part is still missing in the plugin though. We should be able to use `bevy_asset_loader` to remove the boilerplate of creating the texture atlas and inserting a resource with a handle.

In the last update, the `rust>AssetLoader` got an `init_resource` function, that can be used to initialize and insert a resource implementing `rust>FromWorld`. For our texture atlas this means we can write a `rust>FromWorld` implementation. We have the guaranty that at the time when the resource is initialized, we can use our loaded asset collections to, e.g., retrieve the sprite sheet handle.

```rust{numberLines: true}
pub struct LoadingPlugin;

impl Plugin for LoadingPlugin {
    fn build(&self, app: &mut AppBuilder) {
        AssetLoader::new(GameState::Loading, GameState::Menu)
            .with_collection::<RawTextureAssets>()
            .init_resource::<TextureAssets>()
            .build(app);
    }
}

#[derive(AssetCollection, Clone)]
pub struct RawTextureAssets {
    #[asset(path = "textures/cauldron.png")]
    pub cauldron_sheet: Handle<Texture>,
}

pub struct TextureAssets {
    pub cauldron: Handle<TextureAtlas>,
}

impl FromWorld for TextureAssets {
    fn from_world(world: &mut World) -> Self {
        let raw_textures = world.get_resource::<RawTextureAssets>().unwrap().clone();
        let mut texture_atlases = world.get_resource_mut::<Assets<TextureAtlas>>().unwrap();
        TextureAssets {
            cauldron: texture_atlases.add(TextureAtlas::from_grid(
                raw_textures.cauldron_sheet.clone(),
                Vec2::new(192., 192.),
                6,
                1,
            )),
        }
    }
}
```

## Future improvements

All in all the current state made it a lot easier to load assets in a "loading" state. But common asset types like `rust>TextureAtlas` could be better supported. I would like to extend the derive macro for `rust>AssetCollection` to add more helper annotations. Maybe in the future it will be possible to have asset collections like:
```rust
#[derive(AssetCollection)]
pub struct TextureAssets {
    #[texture_atlas(cell_width = 192., cell_height = 192., columns = 6, rows = 1)]
    #[asset(path = "textures/cauldron.png")]
    pub cauldron: Handle<TextureAtlas>,
}
```

[loading_using_state]: https://bevy-cheatbook.github.io/cookbook/assets-ready.html
[states]: https://bevy-cheatbook.github.io/programming/states.html
