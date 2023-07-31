---
title: "GitHub workflow to publish a Bevy Android app"
date: 2023-07-31
category: code
summary: "A guide on how to set up and configure a GitHub workflow that builds and publishes your Bevy Android app."
tags:
- gamedev
- rust
- bevy
- android
- automation
- ci/cd
hidden: true
---

This is a guide on how to configure a GitHub workflow for building, signing and publishing an Android app that uses [Bevy][bevy] (there is a separate [guide for iOS][ios-workflow]; Todo: link ios to Android).

The workflow uses the tool [xbuild][xbuild] from a [customized fork][xbuild-fork], which includes a couple fixes and hacks needed to get app bundles. Some of these changes are explained and motivated in [a separate post][note-mobile-bevy-2]. If you want to see the workflow in use, you can take a look at [bevy_game_template][bevy_game_template]

## xbuild setup

You can install xbuild from my fork with `bash$cargo install --git https://github.com/NiklasEi/xbuild`. Check your environment with `bash$x doctor` and install missing dependencies.

To run your project with xbuild, add the following as `manifest.yaml`:

```yaml
android:
  gradle: true
  icon: "icon.png"
  manifest:
    package: "com.example.app"
    version_code: 1
    application:
      label: "Bevy game"
```
*Make sure to correct the path to your app icon. Also, update the package identifier and the app label.*

Connect your Android device to your machine and note down the device id from `bash$x devices`. Now run `bash$x run --device <device ID>`. Gradle should build the project and then start your app on the device. If this works, you can also try building a bundle with `bash$x build --release --platform android --store play`.

## The workflow

The following goes into a `yaml` file in your GitHub workflows directory (for example `.github/workflows/release-android-google-play.yaml`).

```yaml
name: release-android-google-play

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'GitHub Release'
        required: true
        type: string
      play_release:
        description: 'Release name from google play console'
        required: true
        type: string

env:
  # used for uploading the app to a GitHub release
  APP_NAME: bevy_game
  BUNDLE_PATH: "target/x/release/android/mobile.aab"
  PACKAGE_NAME: "com.example.app"
  # release track; you can promote a build to "higher" tracks in the play console or publish to a different track directly
  # see track at https://github.com/r0adkll/upload-google-play#inputs for more options
  TRACK: internal
  MOBILE_DIRECTORY: mobile

permissions:
  contents: write

jobs:
  bundle-sign-release:
    runs-on: ubuntu-latest
    timeout-minutes: 40
    steps:
      - name: Install Dependencies
        run: sudo apt-get update; sudo apt-get install pkg-config libx11-dev libasound2-dev libudev-dev lld llvm
      - uses: actions/checkout@v3
      - uses: dtolnay/rust-toolchain@stable
      - name: Add Android targets
        run: rustup target add aarch64-linux-android armv7-linux-androideabi
      - name: Install cargo-binstall
        run: curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash
      - name: Install xbuild
        run: cargo binstall --git https://github.com/NiklasEi/xbuild --bin-dir x xbuild -y
      - name: Build app bundle
        run: |
          cd ${{ env.MOBILE_DIRECTORY }}
          x doctor
          x build --release --platform android --store play
      - name: sign app bundle
        run: |
          KEYSTORE_PATH=${{ runner.temp }}/upload-keystore.jks
          echo -n "${{ secrets.PLAYSTORE_KEYSTORE }}" | base64 --decode > $KEYSTORE_PATH
          jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore $KEYSTORE_PATH -storepass "${{ secrets.PLAYSTORE_KEYSTORE_PASSWORD }}" ${{ env.BUNDLE_PATH }} upload
      - name: Upload self-signed bundle to GitHub
        uses: svenstaro/upload-release-action@v2
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          file: ${{ env.BUNDLE_PATH }}
          asset_name: ${{ env.APP_NAME }}_${{ inputs.version }}_android.aab
          release_name: ${{ inputs.version }}
          tag: ${{ inputs.version }}
          overwrite: true
      - name: prepare Google play store secrets
        run: |
          SERVICE_ACCOUNT=${{ runner.temp }}/service-account.json
          echo -n "${{ secrets.PLAYSTORE_SERVICE_ACCOUNT }}" | base64 --decode > $SERVICE_ACCOUNT
      - name: upload bundle to Google play store
        uses: r0adkll/upload-google-play@v1
        with:
          serviceAccountJson: ${{ runner.temp }}/service-account.json
          packageName: ${{ env.PACKAGE_NAME }}
          releaseName: ${{ inputs.play_release }}
          releaseFiles: ${{ env.BUNDLE_PATH }}
          track: ${{ env.TRACK }}
```
*Change the `env` section according to your project. The bundle name is going to be your crate name with an `aab` file ending. If the crate that is built as a library for Android is in the root of your project, remove the `MOBILE_DIRECTORY` variable and its usage. Otherwise, adapt the value.*

The workflow requires multiple secrets to be configured in GitHub. You need to have a Google Play Developer account which comes with a one-time 25$ registration fee.

Before configuring the required secrets, let's quickly go through the workflow steps:

1. Install dependencies for Bevy and xbuild
2. Check out the repository
3. Install the stable toolchain of Rust
4. Install Rust targets for Android
5. Install cargo-binstall to significantly speed up the next step
6. Install xbuild from my fork using a prebuilt binary
7. Create an app bundle with xbuild
8. Sign the app bundle using jarsigner
9. Upload the bundle to a GitHub release
10. Prepare the Google Play Store service account secret
11. Upload the bundle to Google Play Store

Produced app bundles will contain libraries for the ABIs `arm64-v8a` and `armeabi-v7a`, which cover more than 90% of the devices currently supported by Android (see [Notes on mobile development with Bevy #2][note-mobile-bevy-2-abi-support] for more details).

## Setting up the secrets

Simple strings like passwords can directly go into a GitHub secret. Files will be encoded first using base64 (e.g. `bash$openssl base64 -in ~/upload-keystore.jks`).

To configure a secret go to your repository settings in GitHub. Navigate to "Security" -> "Secrets and variables", select "Actions" then click "New repository secret".

- **PLAYSTORE_KEYSTORE** and **PLAYSTORE_KEYSTORE_PASSWORD**
  - You can generate a keystore with `bash$keytool -genkey -v -keystore ~/upload-keystore.jks -keyalg RSA -keysize 2048 -validity 10000 -alias upload`
  - add the password and the base64 encoded keystore to GitHub
- **PLAYSTORE_SERVICE_ACCOUNT**
  - go to the [Service accounts page][service-accounts] to create a new service account
    - select a project or create a new one, then click on "Create service account"
    - set a name and press "Continue"
    - click "Select a role", then find and select "Service Accounts" -> "Service Account User", and press "Done"
    - open the "Actions" vertical three-dot menu of the service account you just created
    - select "Manage keys" and click "Add Key" + "Create New Key"
    - chose the `json` type and press "Create"
    - the key should be automatically downloaded to your machine
    - encode the key and add it to GitHub
  - visit the Google Play Console and navigate to "Setup" -> "API access"
  - under "Service accounts", find your newly created account and click "Manage Play Console permissions"
  - go to the "App permissions" tab and add your app
  - click "Invite user" to finish the process



Before running the workflow for the first time, got to Play Store Connect and create a release in "Internal testing". Remember the name (e.g. "v0.1.0") since you will have to pass it to the workflow. Create a bundle on your machine following the workflow steps 7 and 8, then upload it manually to the release. Otherwise, the Google Play API will return the error "Package not found".

Now you can head over to the "Actions" tab in your repository. Find the workflow in the list on the left, select it and click "Run workflow" in the top right. Put a name for a GitHub release in the first input and the release name from Google Play Console in the second and press "Run workflow".

## Final comments

The app build number is taken from the `manifest.yaml` and needs to be bumped for every build. Otherwise, the upload is not accepted by Google Play Console.

Workflow runs are free for public repositories on GitHub. If your project is private, it will use build minutes from your allowance ([2000 minutes per month on a free account][github-actions-free]).

---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl_me@mastodon.online ][mastodon] or on the [Bevy Discord server][bevy_discord] (@nikl).

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
[ios-workflow]: https://www.nikl.me/blog/2023/github_workflow_to_publish_ios_app/
[note-mobile-bevy-2]: https://www.nikl.me/blog/2023/notes_on_mobile_development_with_bevy_2/
[note-mobile-bevy-2-abi-support]: https://www.nikl.me/blog/2023/notes_on_mobile_development_with_bevy_2#support-more-android-devices
[xbuild-fork]: https://github.com/NiklasEi/xbuild
[xbuild]: https://github.com/rust-mobile/xbuild
[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/main/.github/workflows/release-android-google-play.yaml
[google-create-service-account]: https://developers.google.com/identity/protocols/oauth2/service-account#creatinganaccount
[github-actions-free]: https://github.com/pricing
[service-accounts]: https://console.developers.google.com/iam-admin/serviceaccounts
