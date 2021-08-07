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
For a background of why I wrote this plugin and thoughts on future functionality, see the post ["Asset handling in Bevy apps"][asset_handling_in_bevy_apps].

For an example game using `bevy_asset_loader`, you can take a look at the internal `rust>LoadingPlugin` of [`bevy_game_template`][bevy_game_template].



[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/0ff7b1fc2384c16934ce54bac0473bd40d24ba91/game_plugin/src/loading.rs
[asset_handling_in_bevy_apps]: /blog/2021/asset-handling-in-bevy-apps/
