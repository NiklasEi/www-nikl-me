---
title: "bevy_asset_loader"
github: https://github.com/NiklasEi/bevy_asset_loader
crate: bevy_asset_loader
date: 2021-08-03
tags:
- Rust
- Gamedev
- Bevy
---

This Bevy plugin reduces boilerplate when loading game assets. The crate offers the `rust>AssetCollection` trait and can automatically load structs that implement it. The trait can be derived.

Deriving `AssetCollection` leads to a readable definition of assets in your game code. A simple example loading an image and a sound file looks like this:
```rust
#[derive(AssetCollection)]
pub struct SomeAssets {
    #[asset(path = "sounds/background.ogg")]
    pub background: Handle<AudioSource>,
    #[asset(path = "textures/castle.png")]
    pub castle: Handle<Image>,
}
```

Apart from simple assets like above you can also define more complex assets with the derive macro:
```rust
#[derive(AssetCollection)]
pub struct SomeAssets {
    #[asset(standard_material)]
    #[asset(path = "sounds/image.png")]
    pub standard_material: Handle<StandardMaterial>,
    #[asset(texture_atlas(tile_size_x = 32., tile_size_y = 64., columns = 8, rows = 2))]
    #[asset(path = "images/sprite_sheet.png")]
    pub female_adventurer: Handle<TextureAtlas>,
}
```

You can also configure the path to a certain asset file at run time. This is done via a mapping defined in a resource.
```rust
#[derive(AssetCollection)]
pub struct DynamicAsset {
    #[asset(key = "character")]
    player: Handle<Image>,
}
```
For this to work, the key `character` needs to be defined in the `AssetKeys` resource before entering the loading state.

The above example can all be found in complete bevy examples in [the plugin's GitHub repository](https://github.com/NiklasEi/bevy_asset_loader/tree/main/bevy_asset_loader/examples).

For a background of why I wrote this plugin and thoughts on future functionality, see the post ["Asset handling in Bevy apps"][asset_handling_in_bevy_apps].

For an example game using `bevy_asset_loader`, you can take a look at the internal `rust>LoadingPlugin` of [`bevy_game_template`][bevy_game_template].



[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/0ff7b1fc2384c16934ce54bac0473bd40d24ba91/game_plugin/src/loading.rs
[asset_handling_in_bevy_apps]: /blog/2021/asset-handling-in-bevy-apps/
