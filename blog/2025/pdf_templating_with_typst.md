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

A large number of businesses software needs to create documents at some point. A template will define the layout and general look, while dynamic content is provided by the software's users and/or database. Often the preferred output format for storage and distribution is PDF. In this post, I want to discuss existing solutions and an approach using the modern typesetter Typst.

We will concentrate on PDF file output with a high quality and total control in the templates. File generation should be as fast as possible and should run in different environments. The backend, using "some tech-stack", can create documents and a potetial frontend in the browser can generate and display live previews.

A PDF templating solution should allow to share parts of the document to, for example, use the same header and footer for all your buisiness reports. Apart from structured text, common elements of documents are tables, images, headers, and footers. These elements need to be flexible and customizable. Think of tables in invoices which might need to stretch over multiple pages, have subtotals on each table page, or merge some columns/rows. The typesetter needs to be able to calculate things like the subtotals for every table page, because only the typesetter will be able to tell what items end up on which page in the final layout.

## Existing solutions

There is a large number of commercial and noncommercial products offering PDF templating. From libraries that allow building PDF documents completely out of code to rendering an HTML template with a headless browser you can find all kinds of solutions. I am unhappy with most of them. Let's go through some of the issues I see.

### GUI based solutions

Many commercial solutions come with a GUI editor only and export templates in some binary format. My biggest gripe with that is maintainability. I am looking at this issue from the point of view of a software developer. As such, I want to be able to put the templates into version control. Changes to templates should be reviewed in a pull request. Clicking and dragging a template together in a GUI is just not reproducible enough in my opinion. Additionaly, if you want to use LLMs to help maintain the templates, that is significantly easier if their source is text based.

Sharing layouts or some template elements is often complicated in these GUI solutions or not possible at all. It also makes it more difficult to allow end users to provide some parts of the template.

With these arguments I would discard any GUI based solution and only consider markup-based approaches for templates from here on out. That of course does not mean, that the final solution cannot have a graphical editor that outputs the markup!

### Custom typesetter

Some solutions come with their own typesetter and layouting engine. While that is admirable, I can see significant downsides for that approach. Developing a capable typesetter is a gigantic task. My expectation for most custom typesetters developed for a single solution is that they are lacking features and flexibility.

Since they are custom for some product, they often have small or non existing ecosystems. Meaning there are less resources in the form of documentation, example projects, and shared components. It also means that the people building the PDF templating solution, have to spent a significant portion of their time on the typesetter and layouting engine.

### HTML based templating

- not really made for paginated content (e.g. it gets hard to customize tables; page breaks usw)
- rather slow to startup a (headless) browser for rendering
- not many possibilities for more PDF specific things like PDF/A support, or file embedding



- Limited cross platform support

## Powerfull markup-based typesetting

One complete markup-based typesetting solution is LaTeX. LaTeX can create advanced documents and can share components and layouts through packages. But, LaTeX is rather complicated (macro based) and not that easy to run on different systems. Rendering larger documents can take multiple seconds and directly integrating a programm with it's compiler is no easy feat (at least for me).

Typst is a modern markup-based typesetting system. It is focused on performance, can run in many environments like all major desktop operating systems and WebAssembly in the Browser, and the compiler is open source.

The company behind Typst maintains the open source compiler and offers a web editor. The editor has a substancial free tier and [pro features](https://typst.app/pricing/) like private packages, additional storage, and more. For privacy sensitive companies, the on premise solution might be of interest. 



## PDF templating with Typst

The Typst compiler is available as a Rust library. We can use it to create a PDF from a Typst project out of Rust code. To allow users on different techstacks to create PDFs, the rust library can be wrapped using FFI or equivalents for many programming languages.



Wrap rust library for multiple targets (web, C#)
