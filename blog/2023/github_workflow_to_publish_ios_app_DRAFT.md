---
title: "GitHub workflow to publish iOS app"
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

I built a GitHub workflow to bundle, sign and publish an iOS app. There are already a couple guides on how to do this, but none of them worked out of the box for me (an iOS/mac noob). With a lot of googling plus trial and error, I pieced together the missing and broken parts. Since I wouldn't wish than on anyone, here are some information on how to use the workflow that I ended up with.

The project that the workflow was build for might be a bit unconventional. It's a mobile app using the rust game engine [Bevy][bevy]. It is expecting a specific project structure with the xcode project living in the subdirectory `mobile`, but shouldn't be hard to adapt to your own structure. The whole workflow will be part of this post, but if you want to see it in use, you can take a look at [bevy_game_template][bevy_game_template].

## The Workflow

```yaml
name: release-ios-testflight

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version - e.g. v1.2.3'
        required: true
        type: string

env:
  # used for uploading the app to a GitHub release
  GAME_EXECUTABLE_NAME: bevy_game

permissions:
  contents: write

jobs:
  build-for-iOS:
    runs-on: macos-latest
    timeout-minutes: 40
    steps:
      - uses: actions/checkout@v3
      - uses: dtolnay/rust-toolchain@stable
      - name: Add iOS targets
        run: rustup target add aarch64-apple-ios
      - name: Install the Apple certificate and provisioning profile
        id: profile
        env:
          IOS_CERTIFICATE: ${{ secrets.IOS_CERTIFICATE }}
          IOS_CERTIFICATE_PASSWORD: ${{ secrets.IOS_CERTIFICATE_PASSWORD }}
          IOS_PROVISION_PROFILE: ${{ secrets.IOS_PROVISION_PROFILE }}
          IOS_KEYCHAIN_PASSWORD: ${{ secrets.IOS_KEYCHAIN_PASSWORD }}
        run: |
          # create variables
          CERTIFICATE_PATH=${{ runner.temp }}/build_certificate.p12
          PP_PATH=${{ runner.temp }}/profile.mobileprovision
          KEYCHAIN_PATH=${{ runner.temp }}/app-signing.keychain-db

          # import certificate and provisioning profile from secrets
          echo -n "$IOS_CERTIFICATE" | base64 --decode -o $CERTIFICATE_PATH
          echo -n "$IOS_PROVISION_PROFILE" | base64 --decode -o $PP_PATH
          uuid=`grep UUID -A1 -a $PP_PATH | grep -io "[-A-F0-9]\{36\}"`
          echo "uuid=$uuid" >> $GITHUB_OUTPUT

          # create temporary keychain
          security create-keychain -p "$IOS_KEYCHAIN_PASSWORD" $KEYCHAIN_PATH
          security set-keychain-settings -lut 21600 $KEYCHAIN_PATH
          security unlock-keychain -p "$IOS_KEYCHAIN_PASSWORD" $KEYCHAIN_PATH

          # import certificate to keychain
          security import $CERTIFICATE_PATH -P "$IOS_CERTIFICATE_PASSWORD" -A -t cert -f pkcs12 -k $KEYCHAIN_PATH
          security list-keychain -d user -s $KEYCHAIN_PATH

          # apply provisioning profile
          mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
          cp $PP_PATH ~/Library/MobileDevice/Provisioning\ Profiles/$uuid.mobileprovision
      - name: Build app for iOS
        run: |
          cd mobile
          xcodebuild PROVISIONING_PROFILE=${{ steps.profile.outputs.uuid }} -scheme mobile clean archive -archivePath "Actions" -configuration Release -arch arm64
      - name: export ipa
        env:
          EXPORT_PLIST: ${{ secrets.IOS_EXPORT_PRODUCTION }}
        run: |
          EXPORT_PLIST_PATH=${{ runner.temp }}/ExportOptions.plist
          echo -n "$EXPORT_PLIST" | base64 --decode --output $EXPORT_PLIST_PATH
          xcodebuild PROVISIONING_PROFILE=${{ steps.profile.outputs.uuid }} -exportArchive -archivePath mobile/Actions.xcarchive -exportOptionsPlist $EXPORT_PLIST_PATH -exportPath ${{ runner.temp }}/export
      - name: decode API key
        env:
          API_KEY_BASE64: ${{ secrets.APPSTORE_API_PRIVATE_KEY }}
        run: |
          mkdir -p ~/private_keys
          echo -n "$API_KEY_BASE64" | base64 --decode --output ~/private_keys/AuthKey_${{ secrets.APPSTORE_API_KEY_ID }}.p8
      - name: Upload to testflight
        run: |
          xcrun altool --validate-app -f ${{ runner.temp }}/export/mobile.ipa -t ios --apiKey ${{ secrets.APPSTORE_API_KEY_ID }} --apiIssuer ${{ secrets.APPSTORE_ISSUER_ID }}
          xcrun altool --upload-app -f ${{ runner.temp }}/export/mobile.ipa -t ios --apiKey ${{ secrets.APPSTORE_API_KEY_ID }} --apiIssuer ${{ secrets.APPSTORE_ISSUER_ID }}
      - name: Upload release
        uses: svenstaro/upload-release-action@v2
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          file: ${{ runner.temp }}/export/mobile.ipa
          asset_name: ${{ env.GAME_EXECUTABLE_NAME }}_${{ inputs.version }}_ios.ipa
          release_name: ${{ inputs.version }}
          overwrite: true
```

The workflow requires multiple secrets to be configured in GitHub. Some of those need an active membership in the Apple developer program, which costs 99$ per year. We'll get back to getting and configuring the secrets later. First, let's go through the workflow steps:

1. Check out the repository
2. Install the stable toolchain of Rust (remove this in case you do not use rust)
3. Install Rust targets for iOS (remove this in case you do not use rust)
4. Some of the required secrets need to be written to files in specific locations. The build certificate and provisioning profile are files encoded in base64 and need to be decoded.
   - The build certificate is imported into a temporary keychain using its password. `xcode` will read the certificate from the keychain automatically.
   - Provisioning profiles are picked up by `xcode` from `~/Library/MobileDevice/Provisioning\ Profiles/`. I use it's uuid as file name, because I had some issues where `xcode` couldn't find the correct profile, but I am not sure if this is actually needed.
5. Use `xcodebuild` to archive your project.
6. Use `ExportOptions.plist` to export a `.ipa` from the archive.
7. Decode the API to talk to the app store. The key is moved to `~/private_keys` and needs to contain the key id in its name for `altool` to find it.
8. Talk to the app store to validate and upload the `ipa`.
9. Upload the self-signed `ipa` to a GitHub release.

The version of the app is defined in your apps `Info.plist`. It needs to be a new version for Apple to accept your build.

## Setting up the secrets

Simple strings like passwords can directly go into a GitHub secrets. Files will be encoded first using base64 (for example like so `openssl base64 -in ~/ExportOptions.plist`).

To configure a secret go to you repository settings in GitHub. Got to *Security* - *Secrets and variables*, select *Actions* then click "New repository secret".

You will need:
 - **IOS_CERTIFICATE** and **IOS_CERTIFICATE_PASSWORD**
   - You can use `xcode` to create a certificate for you (screenshots/description Todo)
   - Export the certificate `.p12` from your keychain and set the password while doing so
   - The exported `.p12` file needs to be base64 encoded before adding it as a GitHub secret
 - **IOS_PROVISION_PROFILE**
   - After creating your distribution certificate, you can visit https://developer.apple.com/account/resources/profiles/list to create a new distribution profile. Select `+`, chose *Distribution* - *App Store*, then select your app and the previously created distribution certificate. The final step is setting the name of your profile, which you should note down for the next step. After clicking "Generate", you can download your `.mobileprovision` file and proceed with base64 encoding and configuring the secret in GitHub.
 - **IOS_KEYCHAIN_PASSWORD**
   - This can be any string, since it is only used to create and open a temporary keychain on the action runner
 - **IOS_EXPORT_PRODUCTION**
   - You can start off your `ExportOptions.plist` with the following:
        ```xml
        <?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
        <plist version="1.0">
        <dict>
                <key>destination</key>
                <string>export</string>
                <key>provisioningProfiles</key>
                <dict>
                       <key>{application identifier e.g. me.nikl.bevygame}</key>
                       <string>{name of distribution profile}</string>
                </dict>
                <key>manageAppVersionAndBuildNumber</key>
                <true/>
                <key>method</key>
                <string>app-store</string>
                <key>signingStyle</key>
                <string>manual</string>
                <key>stripSwiftSymbols</key>
                <true/>
                <key>teamID</key>
                <string>{your team id}</string>
                <key>uploadSymbols</key>
                <true/>
        </dict>
        </plist>
        ```
   - Replace the application identifier, provisioning profile name and team ID
   - Encode using base64 and add to GitHub


---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl_me@mastodon.online ][mastodon] or on the [Bevy Discord server][bevy_discord] (@nikl).

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/main/.github/workflows/release-ios-testflight.yaml