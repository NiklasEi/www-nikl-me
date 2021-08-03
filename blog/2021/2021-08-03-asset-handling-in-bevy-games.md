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

A very first usage of assets in your Bevy game might look like this
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

_Loading the texture where we need it_

Here we are telling the asset server to load `player.png` from our `assets` directory. This will happen asynchronously. The SpriteBundle will be in our ECS at the end of the current frame, but will not be rendered for a few frames, because the asset handle is not yet loaded. As soon as the handle is loaded, our player texture will show up.

In most games there will be a lot more assets than just one player texture. Probably we also have heroic background music, sound effects and some fancy font for all the text. If we load all of those assets when we need them, most will start loading in the first frame. Some will be done after one frame, others will take a bit longer. If we imagine our first screen to be build from different textures, the screen will render texture for texture over some duration.  
Loading handles were and when you need them is fine for small experiments, but most of the time, you will want something more elaborate.

## Prepare all assets before starting the actual game

A common approach is to load all needed assets before starting the game. If the loading needs considerable time, one could even think about a cool loading screen. After loading, we can keep the handles around in resources and just pull them into any system were we need them. The previous example might look like this now:

```rust
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

_Using a resource that contains the needed handle_


Implementing such a loading mechanism in Bevy can be done using States and [is partially demonstrated in the cookbook][loading_using_state]. In my first few Bevy projects I caught myself copying and pasting code for this kind of setup. Apart from the code duplication between projects, there were also a few other pain points:
1. When adding new assets to an existing resource, several pieces of code had to be adjusted
2. The paths to the assets where too far away from the resource field containing the asset handle
    - when I see a piece of code that uses a handle from a resource, I want to be able to jump into the resource and find the corresponding asset path as fast as possible
3. Adding new resources that contain asset handles required too much boilerplate

## Introducing `bevy_asset_loader`

In many cases assets are needed at different places in the code base and at different times during the game.


In many cases it makes sense to save the loaded handles in some




[loading_using_state]: https://bevy-cheatbook.github.io/cookbook/assets-ready.html
