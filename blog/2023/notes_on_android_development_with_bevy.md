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

While working on an Android logic puzzle app with [Bevy], I learned a lot about the current state of Android support in Bevy and its dependencies. The following are a few notes that hopefully are not only useful to myself, but also to others who would like to use Bevy to write an Android app.

The starting point is [Bevy's mobile example][mobile_example]. Take a look at [the example Readme for instructions on how to run it][mobile_example_readme]. For now I will ignore all things iOS since I don't have a setup for iOS development anyways. When my app was only the Bevy example, I could connect my phone, run `cargo apk run -p <app_lib_name>` and the example would open on my phone after around one and a half minutes. Let's work on that. 

## Shorter feedback cycles

Installing the app on my phone should be significantly faster than one minute to not constantly wait after code changes. `cargo apk run` mostly does three things:
1. Compile your code as `cdylib`
2. Bundle and sign the APK
3. Install the APK on the connected device

Looking at the first step already, we can half the compile time of the Bevy example. It configures two android targets `aarch64-linux-android` and `armv7-linux-androideabi`. Every code change you make will be compiled for both targets, but my phone ran fine with only either of them configured. For now, I only build for `aarch64-linux-android`, but when it comes to releasing the app I might add [more targets](https://doc.rust-lang.org/nightly/rustc/platform-support/android.html#building-the-target).

The second step is pretty fast already. One point about the signing though: if you would like a release build, `cargo apk` will complain, that you need a key. If you only want something quick for testing, you can point to the same key that is already used for debug builds:
```toml
[package.metadata.android.signing.release]
path = "~/.android/debug.keystore"
keystore_password = "android"
```

For incremental installs, the third step took by far the longest. More than a minute was spent on copying the APK to my phone. This was easily explained when looking at the size of the bundled APK: 1.5Gb. Half of the APK was gone once we removed one target, but ~750Mb is still too much.

Looking at the documentation of `cargo-apk`, I found an option to strip the shared libraries from debug symbols. This is done by default for release builds, but you can enable it for all builds by configuring `strip = "strip"` under `\[package.metadata.android\]` ([this is now also done for the Bevy example][bevyengine/bevy#8932]).

While developing android specific things, I can now run `cargo watch -x 'apk run -p <app_lib_name>'` and the app opens up in acceptable time (compile + ~3s).

### Desktop build

Even with all the size improvements for our debug APK, running the application on the phone takes longer than on desktop. For code changes that are not platform specific, it's helpful to have a desktop target set up. Especially, because I can't get the app to run in an emulator.

Since `cargo-apk` requires a `cdylib`, I split the project into two crates. One crate contains a library exporting everything as a plugin and a `main` file to target desktop. The other crate only contains a `lib.rs` file, uses the `#[bevy_main]` macro, and configures the android application in its `Cargo.toml`.

Now `cargo watch -x run` restarts the app on my desktop after every code change.

## Window

- set window flag to avoid rendering behind camera
- use content rect after startup to layout between camera and software buttons

## Performance

Todo: is it enough to only use waker?
- desktop mode to not always rerender
- manually request redraw if needed
- try out waker for background tasks

## Backward navigation

My app will only contain logic puzzles and as such doesn't need input apart from touch events; I thought. Then I attempted to use the software back button on my phone and didn't get any keyboard input. This seems to be an open issue in winit ([rust-windowing/winit#2304]). After a little investigation, [I hacked something in my bevy fork and moved on][back_button_hack] (for now).

On desktop, I am used to navigate backwards with my mouse. This is not supported in the latest winit release, [but was merged recently][rust-windowing/winit#2770] and should make its way to Bevy soon. For now, I hardcoded `MouseButton::Other(8)` to be back navigation.

## Known issues

Anyone playing around with Bevy on Android will notice, that the App lifecycle events are not yet completely handled. After minimizing the app it will not resume where you left of, but start up again. This issue is known and solutions where discussed a bit in [bevyengine/bevy#86], but since I couldn't an open issue for the specific problem, I opened [bevyengine/bevy#9057].

---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at ([@nikl_me@mastodon.online ][mastodon]) or on the [Bevy Discord server][bevy_discord] (@nikl).

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
[bevyengine/bevy#9057]: https://github.com/bevyengine/bevy/issues/9057
[bevyengine/bevy#86]: https://github.com/bevyengine/bevy/issues/86
[bevyengine/bevy#8932]: https://github.com/bevyengine/bevy/pull/8932
[rust-windowing/winit#2304]: https://github.com/rust-windowing/winit/issues/2304
[back_button_hack]: https://github.com/bevyengine/bevy/compare/main...NiklasEi:bevy:brain_games#diff-d689ab1249f088846da55ac1f42cec0404a4bee7d788b197c36e16a170752bd7
[rust-windowing/winit#2770]: https://github.com/rust-windowing/winit/pull/2770
[mobile_example]: https://github.com/bevyengine/bevy/tree/main/examples/mobile
[mobile_example_readme]: https://github.com/bevyengine/bevy/blob/main/examples/README.md#android