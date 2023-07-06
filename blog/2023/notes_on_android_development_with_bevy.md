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

While working on an android puzzle app with [Bevy], I learned a lot about the current state of Android support in Bevy and dependencies. The following are a few notes that hopefully are not only useful to myself, but also others wanting to use Bevy to write an Android app.

The starting point for my app was Bevy's mobile example. After removing all things iOS, I could connect my phone, run `cargo apk run -p <app_lib_name>` and the example would open on my phone after around one and a half minutes. Let's work on that. 

## Working mode

Installing the app on my phone should be significantly faster than that to not constantly wait after code changes. `cargo apk run` mostly does three things:
1. Compile the library
2. Bundle and sign the APK
3. Install the APK on the connected device

Looking at the first step already, we can half the compile time starting from the Bevy example. It configures two android targets `aarch64-linux-android` and `armv7-linux-androideabi`. Every code change you make will be compiled for both targets effectively doubling the compile time. My phone ran fine with only either of the two targets configured, so I only kept `aarch64-linux-android`. If I get to releasing the app I might add [other ones again](https://doc.rust-lang.org/nightly/rustc/platform-support/android.html#building-the-target).

The second step is pretty fast already. One point about the signing though: if you would like a release build, `cargo apk` will complain, that you need a key. If you only want something quick for testing, you can point to the same key that is already used for debug builds like so
```toml
[package.metadata.android.signing.release]
path = "~/.android/debug.keystore"
keystore_password = "android"
```

For incremental installs, the third step took by far the longest. More than a minute was spent on copying the APK to my phone with the setup from the Bevy example.

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

- crash when minimizing (opened [bevyengine/bevy#9057])
---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at ([@nikl_me@mastodon.online ][mastodon]) or on the [Bevy Discord server][bevy_discord] (@nikl).

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
[bevyengine/bevy#9057]: https://github.com/bevyengine/bevy/issues/9057
