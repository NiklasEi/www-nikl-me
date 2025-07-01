---
title: "WIP"
date: 2025-06-27
category: code
summary: "WIP"
hidden: true
tags:
- rust
- typst
- oicana
---

A large number of businesses software needs to create documents at some point. Some kind of template will define a layout and general look, while dynamic content is provided by the software's users and/or database. Often the preferred output for storage and distribution is PDF files. In this post, I want to discuss existing solutions and a rather modern approach using the typesetter Typst.

We will concentrate on PDF file output with a high quality and total control in the templates. File generation should be as fast as possible and should run in different environments. The backend, using some tech-stack, can create documents and a potetial frontend in the browser can generate and display live previews.

A PDF templating solution should allow to share parts of the document to, for example, use the same header and footer for all your buisiness reports. Common elements of documents are tables, images, headers, and footers. These elements need to be flexible and customizable. Think of tables in invoices which might need to stretch over multiple pages, have subtotals on each table page, or merge some columns/rows. The typesetter needs to be able to calculate things like the subtotals for every table page.

## Existing solutions

There is a large number of (non-)commercial products offering such PDF templating. They usually fall into one of three categories:
1. HTML based templates
2. Custom typesetter
3. Integration for existing typesetting software

### HTML based templating

- not really made for paginated content (e.g. it gets hard to customize tables; page breaks usw)
- rather slow to startup a (headless) browser for rendering
- not many possibilities for more PDF specific things like PDF/A support, or file embedding

### Custom typesetter

- Often limited; typesetting is a very big problem space
- Usually very limited ecosystem of shared components; if any
- 

### Integration into existing software for layouting

An example in this category are all the solutions to use Word-documents as templates.

### Common issues

Solutions in the second and third category are often GUI based and export to some binary format (most likely propriatery). This makes the templates harder to maintain and often complicates sharing common components. It also makes it more difficult to keep the templates in versioning software like `git` or reuse them with a different templating solution.

- Limited cross platform support

## Powerfull markup-based typesetting

One complete markup-based typesetting solution is LaTeX. LaTeX can create advanced documents and can share components and layouts through packages. But, LaTeX is rather complicated (macro based) and not that easy to run on different systems. Rendering larger documents can take multiple seconds and directly integrating a programm with it's compiler is no easy feat (at least for me).

Typst is a modern markup-based typesetting system. It is focused on performance, can run in many environments like all major desktop operating systems and WebAssembly in the Browser, and the compiler is open source.

The company behind Typst maintains the open source compiler and offers a web editor. The editor has a substancial free tier and [pro features](https://typst.app/pricing/) like private packages, additional storage, and more. For privacy sensitive companies, the on premise solution might be of interest. 



## PDF templating with Typst

The Typst compiler is available as a Rust library. We can use it to create a PDF from a Typst project out of Rust code. To allow users on different techstacks to create PDFs, the rust library can be wrapped using FFI or equivalents for many programming languages.



Wrap rust library for multiple targets (web, C#)
