---
title: "Notes on Android development using Bevy"
date: 2023-07-08
category: code
summary: "A loose collection of learnings and issues + (attempted) solutions. Among others, contains notes on how to shorten the feedback cycle and figure out the correct places to render things on a phone screen."
tags:
- gamedev
- rust
- bevy
hidden: true
---

- Export options had automatic signing configured. Error was only complaining about not finding a profile...
- Export options needed to include provisioning profile 

https://docs.flutter.dev/deployment/android#create-an-upload-keystore
https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount (https://docs.fastlane.tools/getting-started/android/setup/#collect-your-google-credentials)
---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl_me@mastodon.online ][mastodon] or on the [Bevy Discord server][bevy_discord] (@nikl).

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
[rust-windowing/winit#2931]: https://github.com/rust-windowing/winit/issues/2931