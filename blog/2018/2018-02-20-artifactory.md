---
title: "My new repository manager - Artifactory OSS"
date: 2018-02-20
---
The last week I've been studying for Field Theory I, my last exam this semester. It's tomorrow...

But this evening I had enough of it and decided to do something else. For a long time I wanted to have a remote place for my maven repositories. I knew that there were some free open source solutions, but never actually installed one. But yesterday I stumbled upon the blog entry "<a href="https://inthecheesefactory.com/blog/how-to-setup-private-maven-repository/en" target="_blank">How to setup a Private Maven Repository for in-house Android libraries distribution</a>" and today I just did it.

I got myself a droplet at <a href="https://www.digitalocean.com/" target="_blank">Digital Ocean</a> and more or less followed the instructions. The blog entry Is slightly outdated, but in general still valid. I mixed in some of the instructions from another article I found ("<a href="https://hostpresto.com/community/tutorials/how-to-install-jfrog-artifactory-on-ubuntu-14-04/" target="_blank">How-to Install JFrog Artifactory on Ubuntu 14.04</a>") and ended up with a working installation of the free and open source version of <a href="https://jfrog.com/artifactory/" target="_blank">Artifactory</a>!

There are still some things I would like to improve, like using MySQL as the database and adding a TLS certificate, but I already like the setup a lot. After a small DNS update on a new sub domain, my repository manager is now accessible at <a href="http://repo.nikl.me" target="_blank">repo.nikl.me</a>.
