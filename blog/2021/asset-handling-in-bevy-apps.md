---
title: "Asset handling in Bevy apps"
date: 2021-08-06
category: code
summary: "My path to writing bevy_asset_loader and thoughts on current and future functionality of the crate"
tags:
- gamedev
- rust
- bevy
---

*This post outlines the path that lead to me writing bevy\_asset\_loader ([repository][repo]), a plugin to simplify asset handling in [Bevy][bevy] applications. The later part of the post is about current features of the plugin and thoughts on improvements.*

## Minimalistic approach

A first usage of assets in your Bevy game might look like this:
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
_A system that loads the player texture where and when it's needed._

Here we are telling the asset server to load `rust>"player.png"` from our `assets` directory. The actual loading of the file happens asynchronously. The `rust>SpriteBundle` will be in the ECS at the end of the current frame, but will not be rendered until the asset finished loading. As soon as the handle has the state `rust>LoadState::Loaded`, our player texture will show up.

In most games there will be a lot more assets than just one player texture. Probably, we would also have heroic background music, sound effects, and some fancy font to tell a story. If we load all of those assets when we need them, most will start loading in the first frame. Some might be ready after one frame, others will take longer. Imagine our first screen is build from different textures; the screen will render texture for texture over some duration. Not that nice...  
Loading handles were and when you need them is fine for small experiments, but most of the time, you want something more elaborate. All required assets should already be finished loading when they are used. Additionally, there should be an easy way to use the same handle at different points in the code.

## Preparing all assets in a "loading state"

A common approach is to load all needed assets before starting the game. Most games have some sort of loading screen that gives them time to prepare their assets and indicates progress to the player.  
We can use [states][states] in Bevy to run a certain set of systems before our actual game logic runs. If we keep the loaded asset handles in resources, systems running during later states can use them through the ECS. The previous example might then look like this:

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
_A system using a resource that contains the needed player material handle._

There are three parts to implementing a "loading state" in Bevy. 
1. Start loading all required assets when entering the state
2. Check the `rust>LoadState` of all the assets on update
3. When the state of all assets is `rust>LoadState::Loaded`, build resources containing the handles, insert them, and change the state

I will not show all of that code here. In case you want to implement this yourself, you can take a look at [the cookbook][loading_using_state] for an example of checking asset loading state. You can of course also look at the [implementation in bevy\_asset\_loader on GitHub][loading_state_implementation].

In my first few Bevy projects I found myself copying and pasting the "loading state" plugin. Apart from the code duplication between projects, there were also a few other pain points. There was too much boilerplate when adding new resources or adding more handles to existing resources. In both cases the code had to be adjusted in several places.  
Another issue I had with my code at that point has to do with readability. When I see a piece of code that uses a handle from a resource, I want to be able to find the corresponding asset file path as fast as possible. With the initial implementation, the asset file paths where defined pretty far away from the resources and multiple jumps in my IDE where needed to get to them. The best case scenario would be to have the paths directly at their corresponding handle fields. This literally screams for some macro magic.

A perfect opportunity to write a Bevy plugin.

## Introducing bevy\_asset\_loader

The idea of bevy\_asset\_loader is to solve the above mentioned pain points and stop code duplication. There should be minimal boilerplate when adding new resources containing asset handles (from here on called asset collections) or adding new assets to an existing collection. At the same time, the asset path should be close to the resource field containing its handle.  
The current implementation of bevy\_asset\_loader delivers on all these points. An internal plugin that loads three asset collections during the state `rust>GameState::Loading` looks like this:
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
*A Bevy plugin using bevy_asset_loader to load three different asset collections during the state `rust>GameState::Loading`*

All the boilerplate for the "loading state" is gone. Annotations directly at the fields contain the asset paths, keeping the internal name of the asset close to the file name. The derive macro currently works for structs with named fields. The field types need to be handles for assets that can be loaded directly from a file. This requires a one-to-one relationship of files to handles.

For some use cases this is fine, but common assets like `rust>TextureAtlas` need some extra steps. In Bevy, we can either build an atlas out of many textures ([example][bevy_atlas_example]), or split a sprite sheet ([example][bevy_sprite_sheet_example]). In both cases, we can load the initial textures like demonstrated above. The plugin currently cannot create the atlas out of the textures though. It would be nice to be able to use bevy\_asset\_loader to remove the boilerplate of creating the texture atlas and inserting a resource with the handle.

In the last update, a small feature in this direction was added to bevy\_asset\_loader. The `rust>AssetLoader` struct got an `init_resource` function, that can be used to initialize and insert a resource implementing `rust>FromWorld`. The only difference of this function to Bevy's `rust>AppBuilder::init_resource` is the timing of the initialisation. Bevy builds the resource on startup, while the `rust>AssetLoader` will do it after inserting all our asset collections into the ECS. We can write a `rust>FromWorld` implementation and retrieve our asset collections in it to, e.g., use the loaded sprite sheet to create a texture atlas.

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

#[derive(AssetCollection)]
pub struct RawTextureAssets {
    #[asset(path = "textures/cauldron.png")]
    pub cauldron_sheet: Handle<Texture>,
}

pub struct TextureAssets {
    pub cauldron: Handle<TextureAtlas>,
}

impl FromWorld for TextureAssets {
    fn from_world(world: &mut World) -> Self {
        let cell = world.cell();
        let raw_textures = cell
            .get_resource::<RawTextureAssets>()
            .expect("RawTextureAssets not loaded");
        let mut texture_atlases = cell
            .get_resource_mut::<Assets<TextureAtlas>>()
            .expect("Could not get TextureAtlas assets");
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
_Implementing `rust>FromWorld` to create a texture atlas out of a sprite sheet. The asset loader will take care of initialising and inserting the resource._

This removes some boilerplate, but at the same time moves the asset path further away from the atlas handle. I am sure we can do better.

## Future improvements

The current state of the plugin already makes it a lot easier to prepare assets in a "loading state". The support for common asset types like `rust>TextureAtlas` could be improved though. I would like to extend the derive macro for `rust>AssetCollection` to add more helper annotations. Maybe in the future it will be possible to create asset collections like below.

```rust
#[derive(AssetCollection)]
pub struct TextureAssets {
    #[asset(texture_atlas(cell_width = 192., cell_height = 192., columns = 6, rows = 1))]
    #[asset(path = "textures/cauldron.png")]
    pub cauldron: Handle<TextureAtlas>,
}
```
_Maybe in future versions of the library, texture atlases can be created with attributes on a derived `rust>AssetCollection`._

I would also like to make it easier for users of bevy\_asset\_loader to build nice loading screens. There is an [open issue on GitHub asking for loading statistics][loading_statistics_issue], which should help a lot. The idea would be to offer a resource that keeps track of how many assets are currently loading, how many are done, and how many have not yet started to load. A system running during the "loading state" could then show a progress indicator based on this information.

---

Thank you for reading the whole post! If you have any feedback, questions, or comments, you can find me on Twitter ([@nikl_me][twitter]) or on the [Bevy Discord server][bevy_discord] (@Nikl). 



[repo]: https://github.com/NiklasEi/bevy_asset_loader
[bevy]: https://bevyengine.org/
[loading_using_state]: https://bevy-cheatbook.github.io/cookbook/assets-ready.html
[loading_state_implementation]: https://github.com/NiklasEi/bevy_asset_loader/blob/98c1bf91af98bef17b695e0e191c78105d00057a/bevy_asset_loader/src/lib.rs#L106-L136
[bevy_atlas_example]: https://github.com/bevyengine/bevy/blob/main/examples/2d/texture_atlas.rs
[bevy_sprite_sheet_example]: https://github.com/bevyengine/bevy/blob/main/examples/2d/sprite_sheet.rs
[states]: https://bevy-cheatbook.github.io/programming/states.html
[loading_statistics_issue]: https://github.com/NiklasEi/bevy_asset_loader/issues/6
[twitter]: https://twitter.com/nikl_me
[bevy_discord]: https://discord.gg/bevy
