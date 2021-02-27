---
title: "Changed my host - auto redirect to https"
date: 2017-04-11
---
Today I changed from GitLab pages to <a href="https://www.netlify.com/" target="_blank">Netlify</a>. In the last months I have been trying to find an easy way to auto redirect any non-https request to https. GitLab pages seems to only support META tags at the moment and I didn't want to use those. Neither did I want to use JS to redirect. After some googling (does that really count as a verb now?) I found Netlify and decided to just try it.

Moving was really easy. I made a free account, created a project and connected it to my GitLab repository containing this website. Then I just had to configure the project to be live at my domain and change the DNS records. Aaaand that was it!

Netlifys free plan already comes with the option to let them handle your TLS certificate and redirect all http requests to https. This is just brilliant. Go ahead and try it yourself: remove the s from https at the beginning of the URL to this page and hit enter. See that? It just works :)

Since they can even build and deploy automatically whenever I push to my GitLab repository, nothing else has changed for me. I push changes and the updated website gets build and deployed without any further doing from my side.
