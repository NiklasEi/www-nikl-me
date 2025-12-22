---
title: "Rust for polyglot libraries"
date: 2025-12-21
category: code
summary: "I wrote a polyglot project with Rust at the core. In this post I outline the approach and point out some benefits that Rust brings for this kind of project."
hidden: true
tags:
- rust
- oicana
---

Around two years ago I had an idea for a library project for PDF templating. I had the followign requirements:

* Best performance possible
* Cross-platform
* Native libraries in many different languages

The last part should be as small as possible. Most logic should be implemented once and then only wrapped for consumption from other languages.

> For more on the actual usecase see (post about Oicana). This post will concentrate on the technical approach.


<do i need "why rust?">

There are a couple of projects 


