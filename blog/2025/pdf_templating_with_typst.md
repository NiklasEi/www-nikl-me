---
title: "Oicana - PDF templating with Typst"
date: 2025-12-21
category: code
summary: "There are a lot of existing solutions for PDF tempaltign in software. I argue that most of the used approaches are suboptimal and introduce my own solution built on the modern and open source Typesetter Typst."
hidden: true
tags:
- rust
- typst
- oicana
---

A large number of businesses software needs to create documents at some point. A template will define the layout and general look, while dynamic content is provided by the software's users and/or database. Often the preferred output format for storage and distribution is PDF. In this post, I want to discuss existing solutions and an approach using the modern typesetter Typst.

We will concentrate on PDF file output with a high quality and total control in the templates. File generation should be as fast as possible and should run in different environments. The backend, using "some tech-stack", can create documents and a potential frontend in the browser can generate and display live previews.

A PDF templating solution should enable sharing parts of the document. For example, you might want to use the same header and footer in all your buisiness report templates. Apart from structured text, common elements of documents are tables, images, headers, and footers. These elements need to be flexible and customizable. Think of tables in invoices which might need to stretch over multiple pages, have subtotals on each table page, or merge some columns/rows. The typesetter needs to be able to calculate things like the subtotals for every table page, because only the typesetter will be able to tell what items end up on which page in the final layout.

## Existing solutions

There is a large number of commercial and noncommercial products offering PDF templating. From libraries that allow building PDF documents completely out of code to rendering an HTML template with a headless browser you can find all kinds of solutions. I am unhappy with most of them. Let's go through some of the issues I see.

### GUI based solutions

Many commercial solutions come with a GUI editor only and export templates in some binary format. My biggest gripe with that is maintainability. I am looking at this issue from the point of view of a software developer. As such, I want to be able to put the templates into version control. Changes to templates should be reviewed in a pull request. Clicking and dragging a template together in a GUI is just not reproducible enough in my opinion. Additionally, if you want to use LLMs to help maintain the templates, that is significantly easier if their source is text based.

Sharing layouts or some template elements is often complicated in these GUI solutions or not possible at all. It also makes it more difficult to allow end users to provide some parts of the template (more about that later).

With these arguments I would discard any purely GUI based solution and only consider markup-based approaches for templates from here on out. That of course does not mean, that the final solution cannot have a graphical editor that outputs the markup!

### Custom typesetter

Some solutions come with their own typesetter and layouting engine. While that is admirable, I can see significant downsides for that approach. Developing a capable typesetter is a gigantic task. My expectation for most custom typesetters developed for a single PDF templating solution is that they are lacking features and flexibility.

Since they are custom for some product, they often have small or non existing ecosystems. Meaning there are less resources in the form of documentation, example projects, and shared components. It also means that the people building the PDF templating solution, have to spent a significant portion of their time on the typesetter and layouting engine.

### Integrate with existing layouting engines

This is, in my opinion, the way to go. But most existing solutions using this approach are focused on two unsuitable layout engines.

#### HTML + Browser

A very common solution is to write templates in HTML and essentially use the "print to PDF" function of a headless browser to create a PDF file. Using HTML for tempalting certaily has it's place in web development, but I have some issues with it for PDF templating:

- It's not really made for paginated content. For example, it is hard to customize tables over multiple pages or page breaks in general.
- Browsers are rather slow with rendering PDFs and come with a lot of overhead for just that task.
- Since PDF is not a main target for a browser engine, there are little options like PDF/A support.
- HTML as a general markup language, does not have any control over a PDF output; You could not, for example, embed a file in the PDF output from inside the HTML.

#### Commercial general layouter - aka MS Word

Apart from integration into Word not being straight forward, the main issue is that MS owns Word and could pull the plug on the templating solution at any time. Cross platform support would also be very limited and rely on multiple integrations or on MS offering a stable API across platforms for integration with Word. <Do they???>

There is no ecosystem for sharing layouts outside of copy-pasting Word templates. A large organisation maintaining many document templates should not have to duplicate shared components, but define them at a single place. As far as I am aware, that does not work with MS Word.

## Powerful markup-based typesetting

* LaTeX
* Typst
* Other options?


One complete markup-based typesetting solution is LaTeX. I first came in contact with LaTeX at university where it was the default for scientific writing. LaTeX can create advanced documents and allows sharing components and layouts through packages. But LaTeX is macro based and rather complicated. It can get slow pretty fast, isn't trivial to set up, and directly integrating a program with the LaTeX compiler is no easy feat (at least for me).

Typst is a modern markup-based typesetting system. It is focused on performance, can run in many environments like all major desktop operating systems and in the Browser. Big bunos: the Typst compiler is open source.

The company behind Typst maintains the open source compiler and offers a web editor. The editor has a substantial free tier and [pro features](https://typst.app/pricing/) like private packages, additional storage, and more. For privacy sensitive companies, the on premise solution might be of interest. 

The Typst compiler is available as a Rust library. We can use it to create a PDF from a Typst project out of Rust code. To allow users on different techstacks to create PDFs, the rust library can be wrapped using FFI or equivalents for many programming languages.


## Oicana - PDF templating with Typst

The project I built for PDF templating with Typst is called Oicana and source available under a non commercial license on GitHub.

A git repository hosting all Oicana templates of an organisation can look like so:

-> templates
  > invoice
  > monthly-report
  > ...
-> libraries
  > themes
  > ...
-> CI/CD scripts
-> Readme.md

I think the approach of Oicana works well and despite being in early development, the project can keep up with many other commercial solutions. Typst is very powerfull and on a good trajectory (link to growing github languages). The ecosystem already supports a lot and is growing well (Typst universe).
  
Give the gettign started guid e a try if you are interested. You can reach me at `hello@oicana.com` if you have any questions or feedback!






Wrap rust library for multiple targets (web, C#)

link to post about rust for polyglot libraries

link to typst post about PDF templating
