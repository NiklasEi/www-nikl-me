---
title: "Notes on mobile development with Bevy #2"
date: 2023-07-08
category: code
summary: "A loose collection of learnings and issues + (attempted) solutions. Among others, contains notes on how to shorten the feedback cycle and figure out the correct places to render things on a phone screen."
tags:
- gamedev
- rust
- bevy
- ios
- automation
- ci/cd
hidden: true
---

## Getting an App bundle

With `cargo-apk` we get apk files as the name of the tool suggests. The play store no longer accept APKs, but [requires app bundles][app-bundles-only]. This makes sense to keep downloads small and still support multiple device ABIs ([**A**plication **B**inary **I**nterface][abi-wiki]), but currently makes publishing a Bevy game a bit harder.

The only tool I could convince to create an app bundle from my Bevy project is [`xbuild`][xbuild], the WIP successor of `cargo-apk`[^1]. Adding a `manifest.yml` file with some configuration and running `x build --platform android --store play` gives us an `.aab` bundle, but derived APKs instantly crash. Let's fix that.

### libc++ shared is missing

Looking at the logs with `adb logcat` while trying to start the app on my phone yields the following error
```text
java.lang.UnsatisfiedLinkError: Unable to load native library "/data/app/~~0cxWIprct-rKy7Vggu9E4g==/me.nikl.bevygame-YTVT_qxOwHzm_kGsGV9cYw==/lib/arm64/libmobile.so": dlopen failed: library "libc++_shared.so" not found
```
*The helpful line among hundreds of unhelpful ones.*

Opening the APK as an archive indeed shows that `lib/arm64-v8a/` does not include `libc++_shared.so`, while an APK built with `cargo-apk` includes it. This library is required for audio support in Bevy. I probably could have just ripped out audio for now and continued with the other issues (there are more), but who am I kidding? I want audio!

Telling gradle to include `libc++_shared.so` turned out to be quite a rabbit hole. Usually it should realize on its own that it's needed and "just include" it. Our problem is that we are not using gradle to build the game library, but cargo. This leads to gradle having no way of knowing that we need `libc++_shared.so`. At the end I gave up on a clean and nice solution and went with a hack. I basically [told gradle that we have a c++ library to build][xcode-hack-libc-shared] which requires `libc++_shared.so`. The c++ project is empty, but it does the trick.

With this change the `UnsatisfiedLinkError` from above is gone, but our game still doesn't work.

### Include assets

While `cargo-apk` allows to simply configure an asset directory, `xbuild` does not jet support that. There is an [open PR to add support for assets to the non-gradle builds][xbuild-assets-pr], but that only yields APKs, not app bundles.

Since Bevy usually comes with a single `assets` directory in the root of the project, [I told gradle to just include that][xcode-hack-include-assets].


## CI/CD

I do not own a mac, but still want to support iPhones and iPads. Apple does not make that easy.

Links to posts about the workflows.

## Decide what Android devices to support

After uploading an app bundle, we can use the app bundle explorer in the google play console to explore bundle exports for (a lot of) different devices. Our aab contains libs for 4 different ABIs due to the dummy c++ lib hack, but our game is only compiled for `arm64-v8a` (for compile speed reasons; see previous post).
https://developer.android.com/ndk/guides/abis?hl=en has some info on Android ABIs and how to tell gradle to build only for a certain set of ABIs. By default, gradle will build for all non-deprecated ABIS (https://developer.android.com/ndk/guides/abis?hl=en#gradle)

The device list in the app bundle explorer can be filtered by ABI. Out of the 18.919 devices, 8.599 are `arm64-v8a` and 10.096 `armeabi-v7a`, so I decided to ignore the other ABIs (side note: the bevy mobile example does the same as I now understand :D). I went back to xbuild and fixed the support for `arm` and told it to always build for `arm64` and `arm` when making a build with `--store` option: https://github.com/NiklasEi/xbuild/commit/57dacffc8e146e2d3cf7ada24eb90f3865fae568

The bundle still contains lib directories for `x86` and `x86_64` due to the "dummy cpp lib" workaround. Those lib directories tell the play store that our app bundle can generate APKs for those ABIs which is not correct since we do not build our game for them. To tell gradle to not build the cpp library for the `x86(64)` ABIs: https://github.com/NiklasEi/xbuild/commit/deddb185d5a8eaf120fff0a144dd4c18156aeecf


## Getting screenshots

Adapt window size to needed screenshot size, then add the screenshot system from the bevy example
```rust
fn screenshot_on_spacebar(
    input: Res<Input<KeyCode>>,
    main_window: Query<Entity, With<PrimaryWindow>>,
    mut screenshot_manager: ResMut<ScreenshotManager>,
    mut counter: Local<u32>,
) {
    if input.just_pressed(KeyCode::Space) {
        let path = format!("./screenshot-{}.png", *counter);
        *counter += 1;
        screenshot_manager
            .save_screenshot_to_disk(main_window.single(), path)
            .unwrap();
    }
}
```

---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl_me@mastodon.online ][mastodon] or on the [Bevy Discord server][bevy_discord] (@nikl).

[^1]: [crossbow](https://github.com/dodorare/crossbow) might also work, but I didn't manage to set it up correctly. If you do, please tell me.

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/main/.github/workflows/release-ios-testflight.yaml
[app-bundles-only]: https://android-developers.googleblog.com/2021/06/the-future-of-android-app-bundles-is.html
[xbuild]: https://github.com/rust-mobile/xbuild
[xbuild-fork]: https://github.com/NiklasEi/xbuild
[xcode-hack-libc-shared]: https://github.com/NiklasEi/xbuild/commit/a32cdc4300023c81586748b6d8cc9bef6c5e8155
[xcode-hack-include-assets]: https://github.com/NiklasEi/xbuild/commit/a32cdc4300023c81586748b6d8cc9bef6c5e8155#diff-6279764828c50df7615545319f05789a4a73bd72f620f9c6033e7d8d712df8c0R101
[xbuild-assets-pr]: https://github.com/rust-mobile/xbuild/pull/122
[abi-wiki]: https://en.wikipedia.org/wiki/Application_binary_interface