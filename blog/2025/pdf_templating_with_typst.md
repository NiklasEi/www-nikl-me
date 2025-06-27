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

A large number of businesses software needs to create documents at some point. Often output of these systems are PDFs that are archived and/or distributed (think invoices or reports).

To offer such document generation, we need to have a form of template that can be rendered with data from different sources like the user or a database. Common elements are tables that need to be flexible enough to stretch over multiple pages, images, headers, and footers.

## Existing solutions

There is a large number of (non-)commercial products offering such PDF templating. They usually fall into one of three categories:
1. HTML based templates
2. Custom layouting implementation
3. Integrate into existing software for layouting

### HTML based templating

- not really made for paginated content (e.g. it gets hard to customize tables; page breaks usw)
- rather slow to startup a (headless) browser for rendering
- not many possibilities for more PDF specific things like PDF/A support, or file embedding

### Custom layouting

- Often limited; layouting is a very big problem space
- Usually very limited ecosystem of shared components; if any
- 

### Integrating into existing software for layouting

An example in this category are all the solutions to use Word-documents as templates.

### Common issues

Solutions in the second and third category are often GUI based and export to some binary format (most likely propriatery). This makes the templates harder to maintain and often complicates sharing common components. It also makes it more difficult to keep the templates in versioning software like `git` or reuse them with a different templating solution.

- Limited cross platform support


A common approach is to maintain templates for such documents as HTML.

Better typesetting: LaTeX, Typst (open source compiler)

Wrap rust library for multiple targets (web, C#)
