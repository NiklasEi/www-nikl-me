---
title: "GitHub workflow to publish an iOS app"
date: 2023-07-29
category: code
summary: "A guide on how to set up and configure a GitHub workflow that builds and publishes an iOS app."
tags:
- gamedev
- rust
- bevy
- ios
- automation
- ci/cd
---

I built a GitHub workflow to bundle, sign and publish an iOS app. There are already a couple guides on how to do this, but none of them worked out of the box for me (an iOS/mac noob). With lots of googling plus trial and error, I pieced together the missing and broken parts. Since I wouldn't wish that on anyone, here is some information on how to set up the workflow.

The project that the workflow was build for might be a bit unconventional. It's a mobile app using the Rust game engine [Bevy][bevy]. The workflow expects a specific project structure with the Xcode project living in a subdirectory. You can change the name of the subdirectory and the Xcode project in the `env` section. The whole workflow is part of this post, but if you want to see it in use, you can look at [bevy_game_template][bevy_game_template].

## The Workflow

The following goes into a `yaml` file in your GitHub workflows directory (for example `.github/workflows/release-ios-testflight.yaml`).

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
   APP_NAME: bevy_game
   XCODE_PROJECT: mobile
   MOBILE_DIRECTORY: mobile

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
              cd ${{ env.MOBILE_DIRECTORY }}
              xcodebuild PROVISIONING_PROFILE=${{ steps.profile.outputs.uuid }} -scheme ${{ env.XCODE_PROJECT }} clean archive -archivePath "Actions" -configuration Release -arch arm64
         - name: export ipa
           env:
              EXPORT_PLIST: ${{ secrets.IOS_EXPORT_PRODUCTION }}
           run: |
              EXPORT_PLIST_PATH=${{ runner.temp }}/ExportOptions.plist
              echo -n "$EXPORT_PLIST" | base64 --decode --output $EXPORT_PLIST_PATH
              xcodebuild PROVISIONING_PROFILE=${{ steps.profile.outputs.uuid }} -exportArchive -archivePath ${{ env.MOBILE_DIRECTORY }}/Actions.xcarchive -exportOptionsPlist $EXPORT_PLIST_PATH -exportPath ${{ runner.temp }}/export
         - name: decode API key
           env:
              API_KEY_BASE64: ${{ secrets.IOS_APPSTORE_API_PRIVATE_KEY }}
           run: |
              mkdir -p ~/private_keys
              echo -n "$API_KEY_BASE64" | base64 --decode --output ~/private_keys/AuthKey_${{ secrets.IOS_APPSTORE_API_KEY_ID }}.p8
         - name: Upload to testflight
           run: |
              xcrun altool --validate-app -f ${{ runner.temp }}/export/${{ env.XCODE_PROJECT }}.ipa -t ios --apiKey ${{ secrets.IOS_APPSTORE_API_KEY_ID }} --apiIssuer ${{ secrets.IOS_APPSTORE_ISSUER_ID }}
              xcrun altool --upload-app -f ${{ runner.temp }}/export/${{ env.XCODE_PROJECT }}.ipa -t ios --apiKey ${{ secrets.IOS_APPSTORE_API_KEY_ID }} --apiIssuer ${{ secrets.IOS_APPSTORE_ISSUER_ID }}
         - name: Upload release
           uses: svenstaro/upload-release-action@v2
           with:
              repo_token: ${{ secrets.GITHUB_TOKEN }}
              file: ${{ runner.temp }}/export/${{ env.XCODE_PROJECT }}.ipa
              asset_name: ${{ env.APP_NAME }}_${{ inputs.version }}_ios.ipa
              release_name: ${{ inputs.version }}
              tag: ${{ inputs.version }}
              overwrite: true
```
*Configure the `env` section according to your project.*

The workflow requires multiple secrets to be configured in GitHub. Some of those need an active membership in the Apple developer program, which costs 99$ per year. We'll get back to getting and configuring the secrets later. First, let's go through the workflow steps:

1. Check out the repository
2. Install the stable toolchain of Rust (remove this in case you do not use Rust)
3. Install Rust targets for iOS (remove this in case you do not use Rust)
4. Some of the required secrets need to be written to files in specific locations. The build certificate and provisioning profile are files encoded in base64 and need to be decoded.
   - The build certificate is imported into a temporary keychain using its password. Xcode will read the certificate from the keychain automatically.
   - Provisioning profiles are picked up by Xcode from `~/Library/MobileDevice/Provisioning\ Profiles/`. I use its uuid as file name, because I had some issues where Xcode couldn't find the correct profile, but I am not sure if this is actually needed.
5. Use `bash$xcodebuild` to archive your project.
6. Use `ExportOptions.plist` to export an `ipa` from the archive.
7. Decode the API to talk to the App Store. The key is moved to `~/private_keys` and needs to contain the key id in its name for `bash$altool` to find it.
8. Talk to the App Store to validate and upload the `ipa`.
9. Upload the self-signed `ipa` to a GitHub release.

Before starting the workflow for the first time, your app should be configured in App Store Connect. The builds will automatically show up in TestFlight after a short processing period.

## Setting up the secrets

Simple strings like passwords can directly go into a GitHub secret. Files will be encoded first using base64 (e.g. `bash$openssl base64 -in ~/ExportOptions.plist`).

To configure a secret go to your repository settings in GitHub. Navigate to *Security* - *Secrets and variables*, select *Actions* then click "New repository secret".

You will need:
 - **IOS_CERTIFICATE** and **IOS_CERTIFICATE_PASSWORD**
   - You can use Xcode to [create a certificate][xcode-docs-create-cert] for you
     - Use the [certificate type][xcode-docs-cert-types] `Apple Distribution` to be able to publish the builds in the store
   - [Export the certificate][xcode-docs-export-cert] as `.p12` from xbuild and set the password while doing so
   - The exported `.p12` file needs to be base64 encoded before adding it as a GitHub secret
 - **IOS_PROVISION_PROFILE**
   - After creating your distribution certificate, you can visit your [developer account resources][developer-account-resources] to create a new distribution profile. Select "+", chose *Distribution* - *App Store*, then select your app and the previously created distribution certificate. The final step is setting the name of your profile, which you should remember for the export options further down. After clicking "Generate", you can download your `.mobileprovision` file and proceed with base64 encoding and configuring the secret in GitHub.
 - **IOS_KEYCHAIN_PASSWORD**
   - This can be any string since it is only used to create and open a temporary keychain on the action runner
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
     - You can find your teamID under "Membership details" in your [account info][apple-account-info]
   - Encode the file using base64 and add it to GitHub
 - **IOS_APPSTORE_API_PRIVATE_KEY** and **IOS_APPSTORE_API_KEY_ID**
    - Follow [the docs to create][create-api-key] a new API key
    - You can use [the role][app-store-key-roles] "Developer"
    - Download (`.p8`) and encode the key using base64 before adding it as a secret
    - Copy the key ID of the just created key from the table
 - **IOS_APPSTORE_ISSUER_ID**
    - Visit "[Users and Access][users-and-access]" to copy the issuer ID

Now that all required secrets are configured, head over to the "Actions" tab in your repository. Find the workflow in the list on the left, select it and click "Run workflow" in the top right.

## Final comments

The version input of the workflow is only used as GitHub release to upload the artifact. The actual app version is defined in your `Info.plist` and needs to be new for the App Store to accept your build.

You cannot easily install the signed ipa on any device without going through the App Store or TestFlight. For macOS apps, there is a different certificate type called "Developer ID Installer" to do so, but there doesn't seem to be something similar for iOS apps.

Workflow runs are free for public repositories on GitHub. If your project is private, it will use build minutes from your allowance ([2000 minutes per month on a free account][github-actions-free]). Know that [every minute with a macOS runner is billed as 10 minutes][github-actions-multipliers].

In case you are also interested in Android development with Bevy, there is a separate [post about a workflow for Android builds][android-workflow].

---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl_me@mastodon.online ][mastodon] or on the [Bevy Discord server][bevy_discord] (@nikl).

[bevy]: https://bevyengine.org/
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
[android-workflow]: https://www.nikl.me/blog/2023/github_workflow_to_publish_android_app/
[bevy_game_template]: https://github.com/NiklasEi/bevy_game_template/blob/main/.github/workflows/release-ios-testflight.yaml
[xcode-docs-create-cert]: https://help.apple.com/xcode/mac/current/#/dev154b28f09?sub=dev23755c6c6
[xcode-docs-cert-types]: https://help.apple.com/xcode/mac/current/#/dev80c6204ec
[xcode-docs-export-cert]: https://help.apple.com/xcode/mac/current/#/dev154b28f09?sub=dev6dab365c2
[developer-account-resources]: https://developer.apple.com/account/resources/profiles/list
[users-and-access]: https://appstoreconnect.apple.com/access/api
[app-store-key-roles]: https://developer.apple.com/support/roles/
[create-api-key]: https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api#3028599
[github-actions-free]: https://github.com/pricing
[github-actions-multipliers]: https://docs.github.com/en/billing/managing-billing-for-github-actions/about-billing-for-github-actions#minute-multipliers
[apple-account-info]: https://developer.apple.com/account
