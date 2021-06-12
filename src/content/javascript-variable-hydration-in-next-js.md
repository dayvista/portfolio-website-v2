---
title: JavaScript Variable Hydration in Next.js
hero_image: leaf.jpg
tags: javascript,markdown,mdx,react,next.js
---

## Say What?

A developer friend and I were tasked with creating a custom static site generator for our clients. A feature of this CMS would be the user's ability to select from a list of pre-defined themes and switch themes at the click of a button. Perhaps this could have been done easily with WordPress. The catch here is that the user sites, and the entire CMS, would be a built using Next.js.

We opted to use [Forestry](https://forestry.io) as a CMS. This gave us a system whereby users could edit JSON files via a friendly user interface. Along with this technology, we realized we could store entire React components as strings in our PostgreSQL database and hydrate them using the `[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)` library.
