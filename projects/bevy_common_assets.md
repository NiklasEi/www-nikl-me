---
title: "bevy_common_assets"
github: https://github.com/NiklasEi/bevy_common_assets
crate: bevy_common_assets
date: 2022-05-01
tags:
- Rust
- Gamedev
- Bevy
- Crate
---

This Bevy plugin offers generic asset loaders for common file formats. Currently supported formats are `json`, `msgpack`, `ron`, `toml`, and `yaml`.

The following example defines a custom asset `rust$Level` and registers asset loaders for all supported formats. These asset loaders are able to load the custom asset type from the different file types now.
```rust
use bevy::prelude::*;
use bevy_common_assets::json::JsonAssetPlugin;
use bevy_common_assets::msgpack::MsgPackAssetPlugin;
use bevy_common_assets::ron::RonAssetPlugin;
use bevy_common_assets::toml::TomlAssetPlugin;
use bevy_common_assets::yaml::YamlAssetPlugin;

fn main() {
    App::new()
        .add_plugins(DefaultPlugins)
        .add_plugin(JsonAssetPlugin::<Level>::new(&["json.level", "custom"]))
        .add_plugin(MsgPackAssetPlugin::<Level>::new(&["msgpack.level"]))
        .add_plugin(RonAssetPlugin::<Level>::new(&["ron.level"]))
        .add_plugin(TomlAssetPlugin::<Level>::new(&["toml.level"]))
        .add_plugin(YamlAssetPlugin::<Level>::new(&["yaml.level"]))
        // ...
        .run();
}

#[derive(serde::Deserialize, bevy::reflect::TypeUuid)]
#[uuid = "413be529-bfeb-41b3-9db0-4b8b380a2c46"]
struct Level {
    positions: Vec<[f32; 3]>,
}
```

See the GitHub repository for more documentation and examples.
