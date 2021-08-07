---
title: "bevy_kira_audio"
github: https://github.com/NiklasEi/bevy_kira_audio
crate: bevy_kira_audio
date: 2021-08-03
tags:
- Rust
- Gamedev
- Bevy
---

This bevy plugin integrates [Kira][kira] into Bevy. The goal is to replace or update bevy_audio, if Kira turns out to be a good approach. Currently, this plugin can play ogg, mp3, flac, and wav formats and supports web builds for everything except mp3. It also supports streaming of generated audio.

For an example game using `bevy_kira_audio`, you can take a look at the internal `rust>AudioPlugin` of [`bevy_game_template`][bevy_game_template].



[kira]: https://github.com/tesselode/kira
[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/0ff7b1fc2384c16934ce54bac0473bd40d24ba91/game_plugin/src/audio.rs
