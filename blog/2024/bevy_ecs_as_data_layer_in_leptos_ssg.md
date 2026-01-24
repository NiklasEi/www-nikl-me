---
title: "Bevy ECS as a data layer for static site generation with Leptos"
date: 2024-01-06
category: code
summary: "Bevy ECS works well as the backbone for games. It enables APIs in Bevy that I think would be awesome to have in the data layer of a static site generator."
tags:
- rust
- bevy
- leptos
- cinnog
---
 
*TLDR: I wrote a static site generator using Leptos and Bevy ECS called [Cinnog][cinnog-crates]*.

There are many static site generators and since I tend to use this website as a playground for learning new technologies, it has used a couple of different ones in the past. The current version is built using Gatsby which is in part because Gatsby uses React (which I wanted to learn at the time) and because I like their data layer.

A data layer in a static site generator simplifies collecting and preparing data required to build the website. For example, a user might get their blog posts from a headless CMS and generate different resolutions for image assets. When deciding what routes to generate, they can look into the data layer to see what blog posts there are and then generate a route for every post. The just-generated smaller version of a post's image could be displayed on the list of blog posts while the post itself uses the original version.

Many generators support a given structure of data and asset files but leave more complex data loading and preparation to their users. I think it is very helpful when a generator provides the structure and access for collecting, preparing and using any kind of data needed for building a website[^1]. This is especially the case if there is a good API for third-party plugins to hook into.

So... I have some time during the holidays... How about trying to build a static site generator with Leptos using Bevy ECS as the data layer?

## Static site generation with Leptos

[Leptos][leptos] is an open source Rust framework for building websites. It supports both [client-side rendering and server-side rendering][leptos_get_started] utilizing [WebAssembly][wasm] (WASM) for reactivity in the browser. By default, the client-side rendered approach is a single page application, where the `index.html` loads a WASM binary that will render the website and handle navigation client-side. Every component that you write will be rendered out of the same WASM binary in the browser. Leptos uses an [interesting setup][leptos_auto_dependency_tracking] for fine-grained reactivity that performs very well.

Since version 0.5, Leptos supports basic static site generation ([see the release notes on "Static Site Generation"][leptos_0_5]). It can be used to pre-generate some routes in a server-side-rendered application for improved performance. If you restrict your whole project to static routes, you can generate the complete website with multiple pages.

In the same update, Leptos also released an experimental feature called "islands" ([see the release notes on Islands][leptos_0_5]). When using islands, "normal" Leptos components are static and served as HTML instead of being rendered client-side through WASM. Only islands will use WebAssembly for reactivity in the browser.

I think the combination of islands and static site generation is perfect for a website like mine. Leptos is the first web framework in Rust that seriously tempts me to rewrite this website (again). If you are interested in web development with Rust, [check it out][leptos_get_started]!

What has been keeping me from rewriting this blog using Leptos, is that I use Gatsby's GraphQL data layer to do a bunch of stuff that is not supported in Leptos itself. I could do things like reading all my markdown files and converting them to HTML as part of the Leptos app, but it feels like there should be a general data layer that one can fill and manipulate before reading it from the Leptos components. Things like automatically creating anchors for headers or generating an RSS feed from all blog posts are easier with a data layer.

## Bevy ECS

[Bevy][bevy] is an open source Rust game engine built with the Entity Component System (ECS) pattern to separate data from behaviour. Using ECS involves breaking up your program into entities, components, and systems. Entities are identifiers that are assigned groups of components. Systems process entities with given sets of components[^2].

In Bevy ECS, components are simple rust structs and systems are "normal" functions. A system requests the data it needs through its parameters, which feels a bit like dependency injection. One can think about an ECS as an in-memory database where systems are the queries.

Many reasons for choosing an ECS for game development are not relevant for a static site generator. And honestly, I am not yet convinced that this is a sane idea at all. But the API of Bevy ECS is nice to work with. Writing rust functions that automatically get the data they ask for feels close to perfect for querying a data layer.

> Bevy and Leptos call different things "component". In Leptos, a component is a building block for the website (like a React component). While in Bevy, components are data and live in the ECS World. In this post, I try to write "Bevy component" and "Leptos component" to differentiate between the two.

## What could it look like

Static site generation with Leptos currently consists of two steps:

1. Collect all static routes
2. Build route content

Leptos compiles some code only for the native target. This code usually serves the website and offers server functions. Part of this code will be filling the data layer from the file system, external APIs, or anywhere else. Once all data is in the ECS, the two steps from above are executed and given access to the data layer. What routes to build can be dependent on the data in the ECS. The same goes for the content of Leptos components in step 2.

Functionality like converting markdown to HTML could be shared in the form of Bevy ECS systems. Common functionality can be part of the generator itself. More specific systems that, for example, build RSS feeds could be offered by external crates. As long as the generator establishes a set of Bevy components for things like HTML, crates should be compatible with each other and the basic generator should be easy to extend. The Bevy ecosystem shows what is possible in regard to extending an ECS by sharing a set of Components and Systems.

## What does it look like

When I started to write this post, the whole thing was only an idea. Some days later, I had a working integration of Bevy ECS into Leptos and had to give it a name. It's now called Cinnog[^3]. You can find the [main repository][cinnog] on GitHub as well as an [example website][cinnog_example] that is hosted on Netlify.

In the main function of the example website, the data layer is filled from the file system. Some ron files are read from the `people` directory and markdown files are read from the `blog` directory. All markdown in the data layer is then converted to HTML.  
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

It's rather crude, but quite compact and all the used systems are part of Cinnog.  

Data types like `PersonData` and `PostFrontMatter` implement the Trait `Ingest`. This Trait controls which components will be added to the data layer. For example, `PersonData` is split into two components:

```rust
#[derive(serde::Deserialize)]
struct PersonData {
    name: String,
    age: u8,
}

impl Ingest for PersonData {
    fn ingest(self, commands: &mut EntityCommands) {
        commands.insert((PersonName(self.name), Age(self.age)));
    }
}
```

The `ingest` method has to be implemented. If the file path is important, `ingest_path` can be overwritten. I started sorting the example blog posts into year directories:
```rust
#[derive(serde::Deserialize, Default)]
#[serde(default)]
pub struct PostFrontMatter {
    pub test: String,
    pub title: String,
    pub draft: bool,
}

impl Ingest for PostFrontMatter {
    fn ingest(self, commands: &mut EntityCommands) {
        commands.insert((TestFontMatter(self.test), PostTitle(self.title), Post));
        if self.draft {
            commands.insert(DraftPost);
        }
    }

    fn ingest_path(&self, commands: &mut EntityCommands, path: &Path) {
        let reg = Regex::new(r"/blog/(<year>[0-9]+)/\.*").unwrap();
        if let Some(caps) = reg.captures(&path.to_string_lossy()) {
            let year = &caps["year"];
            commands.insert(BlogYear(year.to_owned()));
        };
        commands.insert(default_bundle_from_path(path));
    }
}
```

So far, I like the direction Cinnog is taking. There are a lot of rough edges, but basic functionality works. Since the Holidays are over, development might slow down a bit. But I will try to get Cinnog to the point where it can be used for this website. It's definitely a fun project! I might attempt to upstream the required changes to Leptos[^4]. Smaller things like removing the `.static` file ending for statically generated files [will probably not be an issue][remove_static], but I had to make some changes to `leptos_router` to integrate with Bevy ECS and for those I am unsure how that could be upstreamed.

> Update: Cinnog no longer relies on a custom fork of Leptos as of Leptos version 0.6. Cinnog is now available on [crates.io][cinnog-crates].
> 
> All changes from the custom fork were either upstreamed ([#2113][leptos_2113] and [#2207][leptos_2207]) or no longer needed after a refactor of the Bevy ECS integration into Leptos.

---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl.me][bluesky] or on the [Bevy Discord server][bevy_discord] (@nikl).

[^1]: This increases complexity and the gained flexibility might not always be needed. But the generator could use the data layer to easily support a classic structure with data files. Simple projects would almost work out of the box, but if they grow and need more flexibility, the data layer could offer it.
[^2]: Properly explaining ECS is out of scope here, but there are already a lot of good resources for that. You could take a look at [Sander's ECS FAQ][sander_ecs_faq] for general information and the [Bevy ECS docs][bevy_ecs_readme] for some code examples.
[^3]: Following the naming of Leptos ("thin", "small" in Greek), Cinnog means "small" in one of Tolkien's Elvish languages. I just thought it reads nice ^^
[^4]: Some smaller changes have been upstreamed already: [leptos-rs/leptos#2113][leptos_2113]

[bevy]: https://bevyengine.org/
[leptos]: https://leptos.dev/
[leptos_0_5]: https://github.com/leptos-rs/leptos/releases/tag/v0.5.0
[leptos_auto_dependency_tracking]: https://book.leptos.dev/reactivity/14_create_effect.html#autotracking-and-dynamic-dependencies
[wasm]: https://webassembly.org/
[leptos_get_started]: https://book.leptos.dev/getting_started/index.html
[bluesky]: https://bsky.app/profile/nikl.me
[bevy_discord]: https://discord.gg/bevy
[cinnog]: https://github.com/NiklasEi/cinnog
[cinnog_example]: https://github.com/NiklasEi/cinnog_example
[sander_ecs_faq]: https://github.com/SanderMertens/ecs-faq
[bevy_ecs_readme]: https://docs.rs/bevy_ecs/latest/bevy_ecs/
[remove_static]: https://github.com/leptos-rs/leptos/issues/1594#issuecomment-1845939151
[leptos_2113]: https://github.com/leptos-rs/leptos/pull/2113
[leptos_2207]: https://github.com/leptos-rs/leptos/pull/2207
[cinnog-crates]: https://crates.io/crates/cinnog
