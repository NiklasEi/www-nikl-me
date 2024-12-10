---
title: "Cinnog"
description: "An experimental static site generator using Leptos and Bevy ECS"
github: https://github.com/NiklasEi/cinnog
crate: cinnog
date: 2024-01-31
tags:
  - Rust
  - Crate
  - Leptos
  - Bevy
---

Cinnog is an experimental static site generator using Leptos and Bevy ECS.

Cinnog uses Leptos with static site generation and island mode to render a static website. Dynamic parts of the website (islands) use WebAssembly to hydrate in the browser.

All data required to build the website is collected and prepared in a data layer. Cinnog's data layer is a Bevy ECS World and can be queried using Bevy systems.

I wrote an [example project][example-repo] using Cinnog and [deployed it][example-deployed].

The preparation of the data layer currently looks like this in the example project:
```rust
#[tokio::main]
async fn main() -> io::Result<()> {
    DataLayer::new()
        .insert_resource(SiteName("Bevy ECS + Leptos = 💕".to_owned()))
        .read_markdown_directory::<PostFrontMatter>("blog")
        .read_ron_directory::<PersonData>("people")
        .add_plugins(ConvertMarkdownToHtml)
        .build(App)
        .await
}
```

Also see [the blogpost][cinnog-blogpost] about the idea of Cinnog.


[cinnog-blogpost]: /blog/2024/bevy_ecs_as_data_layer_in_leptos_ssg/
[example-repo]: https://github.com/NiklasEi/cinnog_example
[example-deployed]: https://cinnog.netlify.app/
