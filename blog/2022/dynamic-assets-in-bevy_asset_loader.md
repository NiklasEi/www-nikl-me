---
title: "Dynamic assets with bevy_asset_loader"
date: 2022-03-01
category: code
summary: "Summary"
hide: true
tags:
- gamedev
- rust
- bevy
---

One of my favorite Bevy projects at the moment is my plugin [bevy\_asset\_loader][repo]. Its goal is to minimize boilerplate for asset handling while improving code readability and maintainability for games with a lot of assets. I wrote about my motivation and basic idea of the plugin in [a previous blog post][asset_handling_post].

After writing the previous blog post I got a lot of motivation to work on new features. Most of the future functionality mentioned in the post is now implemented. The biggest feature added to `bevy_asset_loader` since the last blog post was not discussed though. That's what this post is about. I am hoping for another motivation bump from sorting all the ideas in my head to write stuff down.

## The idea

In the beginning of `bevy_asset_loader`, all the information needed to load a certain asset was given at compile time. Things like the file path, type information (load it as a standard material plz), or tile sizes for a sprite sheet are passed in derive macro attributes.

```rust
pub struct TextureAssets {
    #[asset(path = "textures/player.png")]
    pub player: Handle<Image>,
    #[asset(texture_atlas(tile_size_x = 192., tile_size_y = 192., columns = 6, rows = 1))]
    #[asset(path = "textures/dog_sprite_sheet.png")]
    pub dog: Handle<TextureAtlas>,
}
```

At compile time the derive macro will "hardcode" the file paths and other configuration in the generated code to load the assets.

The information directly on the asset collection structs is convenient and reads very well in my opinion. But there is an issue with this. If different people (or even teams) take care of assets and coding, the information seems to be at the wrong place. Tile sizes for a sprite sheet might change with updates on the sprite sheet. Changing this configuration feels like it should happen outside the code. The configuration for an asset should be an asset itself.

## Dynamic assets

In some way configuration and asset handle still need to be connected. I went for the easiest approach and opted for connecting them with strings.

```rust
pub struct TextureAssets {
    #[asset(key = "player")]
    pub player: Handle<Image>,
    #[asset(key = "dog")]
    pub dog: Handle<TextureAtlas>,
}
```




---

Thank you for reading! If you have any feedback, questions, or comments, you can find me on Twitter ([@nikl_me][twitter]) or on the [Bevy Discord server][bevy_discord] (@Nikl).

[repo]: https://github.com/NiklasEi/bevy_asset_loader
[bevy]: https://bevyengine.org/
[twitter]: https://twitter.com/nikl_me
[bevy_discord]: https://discord.gg/bevy
[asset_handling_post]: /blog/2021/asset-handling-in-bevy-apps
