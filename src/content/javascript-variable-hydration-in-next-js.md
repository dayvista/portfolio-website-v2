---
title: JavaScript Variable Hydration in Next.js
hero_image: leaf.jpg
tags: javascript,markdown,mdx,react,next.js
published: 06-12-2021
description: Learn how to hydrate a string into valid JSX with dynamic variables and custom components.
---

## Remotely Updating the Theme on a Static Website

A developer friend and I were tasked with creating a custom static site generator for our clients. A feature of this CMS would be the user's ability to select from a list of pre-defined themes and switch themes at the click of a button. Perhaps this could have been done easily with WordPress. The catch here is that the user sites, and the entire CMS, would be a built using Next.js.

We opted to use [Forestry](https://forestry.io) as a CMS. This gave us a system whereby users could edit JSON files via a friendly user interface. Along with this technology, we realized we could store React components as JSX strings (variables, child components, and all) in our PostgreSQL database and hydrate them using the [`next-mdx-remote`](https://github.com/hashicorp/next-mdx-remote) library.

That solved the issue of users being able to update their website themes on-the-fly. By deploying on [Vercel](https://vercel.com), the app is able to take advantage of [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration). Next.js' server-side [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation) function offers a way to fetch data at build time while maintaining the speed and SEO benefits of a statically generated website. My friend and I combined these two features with `next-mdx-remote`, which enables us to hydrate the string into valid JSX, like so:

```javascript
export const getStaticProps = async () => {
  // The Postgres database is managed with Supabase (supabase.io)
  const { data } = await supabase.from("users").select("chosen_theme");
  const { chosen_theme } = data[0];

  // Hydrate the string with next-mdx-remote
  const source = chosen_theme;
  const chosenTheme = await serialize(source);

  return {
    props: {
      theme: chosenTheme,
    },
    // This next line triggers Vercel's servers to check for server-side changes
    // in the fetched data every 1 second. When a change is detected, the specific
    // page that hosts this function gets rebuilt, while the rest of the app's
    // pages are left alone.
    revalidate: 1,
  };
};
```

## Making the Theme Compatible with Dynamic Data

Now this is all well said and done, except the user's info, as stored in key-value pairs, has to be injected into the otherwise static hydrated JSX.

After hours of brainstorming, we came up this approach:

1. Import the JSON file into the same page as `getStaticProps` and convert the JSON to [YAML format](https://www.tutorialspoint.com/yaml/yaml_basics.htm), perhaps using a library like [json2yaml](https://github.com/jeffsu/json2yaml)
2. Concatenate the newly-created YAML string with the JSX string prior to hydration. This creates a MDX string with frontmatter. Frontmatter is data in YAML format placed at the beginning of Markdown files in order to store information about the Markdown file and its contents. This data usually includes the date the file was modified, the content's author, any tags or otherwise identifying information associated with the content, etc.
3. Hydrate the frontmatter into a JavaScript object using the [`gray-matter`](https://github.com/jonschlinkert/gray-matter) library, or a similar frontmatter processing library.
4. Return a `props` object including the the hydrated JSX and JavaScript object. This `props` object is passed to the component on the client side.

> Note: `gray-matter` can apparently also parse frontmatter in JSON format, although I have not tested this functionality.

The modified `getStaticProps` function looks like this:

```javascript
import userDataAsJson from "./userData.json";

export const getStaticProps = async () => {
  // The Postgres database is managed with Supabase (supabase.io)
  const { data } = await supabase.from("users").select("chosen_theme");
  const { chosen_theme } = data[0];

  // Convert the user's JSON data to YAML format
  const userDataAsYaml = json2yaml(userDataAsJson);

  const source = userDataAsYaml + "\n" + chosen_theme;

  // Parse the YAML to JavaScript object format
  const { content, data: userData } = matter(source);

  // Hydrate the string with next-mdx-remote
  const hydratedJsx = await serialize(content, { scope: userData });

  return {
    props: {
      hydratedJsx: hydratedJsx,
      userData: userData,
    },
    revalidate: 1,
  };
};
```

Now, the `userData` object can be destructured on the client side, and its data will be read by the hydrated JSX at build time.

Voila! A SSG, CMS-driven site with the ability to switch themes on demand!
