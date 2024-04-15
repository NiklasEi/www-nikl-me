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

Cinnog uses Leptos with static site generation and islands mode to render a static website with dynamic parts using WebAssembly. As a preparation step, a data layer is constructed using a Bevy ECS World as an in-memory Database.

I wrote an [example project][example-repo] using Cinnog and [deployed it][example-deployed].

The preparation of the data layer currently looks like this in the example project:
```rust
#[tokio::main]
async fn main() -> io::Result<()> {
    let mut data = DataLayer::new();
    data.insert_resource(SiteName("Bevy ECS + Leptos = 💕".to_owned()));

    data.run(read_ron_files_from_directory::<PersonData>, "people")?;
    data.run(read_markdown_from_directory::<PostFrontMatter>, "blog")?;
    data.run(convert_markdown_to_html, ());

    data.build(App).await
}
```

Also see [the blogpost][cinnog-blogpost] about the idea of Cinnog.


[cinnog-blogpost]: /blog/2024/bevy_ecs_as_data_layer_in_leptos_ssg/
[example-repo]: https://github.com/NiklasEi/cinnog_example
[example-deployed]: https://cinnog.netlify.app/
