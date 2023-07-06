---
title: "Notes on Android development with Bevy"
date: 2023-07-06
category: code
summary: ""
tags:
- gamedev
- rust
- bevy
hide: true
---

## Working mode

- longer install times (2 targets) => test what possible on the desktop
- strip shared libs (link Bevy PR)
- alternatively release build with debug key store

## Input

- No support for software keyboard in winit yet (link winit issue) 
- map mouse back navigation to navigate back

## Window

- set window flag to avoid rendering behind camera
- use content rect after startup to layout between camera and software buttons

## Performance

- desktop mode to not always rerender
- manually request redraw if needed
- try out waker for background tasks

## Issues

- crash when minimizing ()
---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at ([@nikl_me@mastodon.online ][mastodon]) or on the [Bevy Discord server][bevy_discord] (@nikl).

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
