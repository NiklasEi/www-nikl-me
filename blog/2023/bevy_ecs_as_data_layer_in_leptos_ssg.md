---
title: "Bevy ECS as data layer for static site generation with Leptos"
date: 2023-12-17
category: code
summary: "Bevy ECS works well as the backbone for games. It enables APIs in Bevy that I think would be awesome to have in the data layer of a static site generator."
tags:
- rust
- bevy
- leptos
hidden: true
---

There are many static site generators and this website has used a couple different ones in the past. The current version is built using Gatsby which is in part because Gatsby uses React (which I have experience with) and because I like their data layer.

A data layer in a static site generator simplifies collection and preparation of data required to build the website. For example, a user might get their blog posts from a headless CMS and generate different resolutions for image assets. When deciding what routes to generate, users can look into the data layer to see what blog posts there are and then generate a route for every post. The just generated smaller version of a post's image could be displayed on the list of blog posts while the post itself uses the original version.

Many generators support a given structure of data and asset files, but leave more complex data loading and preparation to their users. I think it is very helpful, when a generator provides the structure and access for collecting, preparing and using any kind of data needed for building a website[^1]. This is especially the case, if there is a good API for third-party plugins too hook into.

## Static site generation with Leptos

[Leptos][leptos] is an open source Rust framework for building websites. It supports both [client site rendering and server site rendering][leptos_get_started] utilizing [WebAssembly][wasm] (WASM) for reactivity in the browser. By default, the client site rendered approach is a single page application, where the `index.html` loads a wasm binary that will render the website and handle navigation client site. Every component that you write will be rendered out of the same wasm binary in the browser. Leptos uses an [interesting setup][leptos_auto_dependency_tracking] for fine-grained reactivity that performs very well.

Since version 0.5, Leptos supports basic static site generation ([see the release notes on "Static Site Generation"][leptos_0_5]). It can be used to pre-generate some routes in a server site rendered application for performance reasons, but if you restrict yourself to static routes, you can generate a complete website with multiple pages.

In the same update, Leptos also released an experimental feature called "islands" ([see the release notes on Islands][leptos_0_5]). When using islands, "normal" components are static and served as html instead of being rendered client site through WASM. Islands are the components for which you want to have reactivity in the browser. Only these parts of your website will use WebAssembly for reactivity in the browser.

I think the combination of islands and static site generation is perfect for a website like mine. Leptos is the first web framework in Rust that seriously tempts me to rewrite this website (again). If you are interested in web development with Rust, [check it out][leptos_get_started]!

What's currently keeping me from rewriting this blog using leptos, is that I use the Gatsby's data layer to organize doing a bunch of stuff that is not supported in Leptos itself. I could do things like reading all my markdown files and converting them to html as part of the leptos app, but it feels like there should be a general data layer that one can fill and manipulate before reading it from the components.

## ECS

## What could it look like

## Rough edges

---

Thank you for reading! If you have any feedback, questions, or comments, you can find me at [@nikl_me@mastodon.online ][mastodon] or on the [Bevy Discord server][bevy_discord] (@nikl).

[^1]: This increases complexity and the gained flexibility might not always be needed. But by default, the generator could use the data layer to support a classic structure with data files. Simple projects would work out of the box, but if they grow and need more flexibility, the generator can offer it.

[bevy]: https://bevyengine.org/
[leptos]: https://leptos.dev/
[leptos_0_5]: https://github.com/leptos-rs/leptos/releases/tag/v0.5.0
[leptos_auto_dependency_tracking]: https://book.leptos.dev/reactivity/14_create_effect.html#autotracking-and-dynamic-dependencies
[wasm]: https://webassembly.org/
[leptos_get_started]: https://book.leptos.dev/getting_started/index.html
[mastodon]: https://mastodon.online/@nikl_me
[bevy_discord]: https://discord.gg/bevy
