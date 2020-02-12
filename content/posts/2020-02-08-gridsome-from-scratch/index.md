---
title: 'Gridsome from Scratch'
date: 2020-02-11
published: false
tags: ['jamstack', 'web', 'vue', 'gridsome']
canonical_url: false
description: 'Get up and running with gridsome from scratch'
---

[Gridsome](https://gridsome.org) is a static framework built ontop of Vue.js. It uses GraphQL as the data layer. Because of that, it is easy to think of it as Gatsby for Vue. If you want the full rundown check their website. 

**TLDR: It's pretty easy to get started. Especially if you've been looking for a Vue based Gatsby alternative.**

### Why Gridsome?

* Vue.js
* GraphQL
* Static site generator
* fast by default

I use switched to Gridsome for my own site in June or July 2019. I was using Gatsby, but didn't know React, which made developing things difficult. Once I heard about Gridsome I decided to check it out. Especially since I was doing a lot of Vue development at the time.

[v0.7 of Gridsome](https://gridsome.org/blog/2019/09/17/gridsome-v07/) was released shortly after I began using Gridsome. The latest release includes many features I had been searching for, but I kept putting off upgrading. Until now.

In the interest of learning Gridsome more completely I decided to rewrite my site from scratch. Without a starter. Like I said, from scratch. This post will serve as a living document of what I learn along the way.

## Get started

I think the Gridsome documentation is good. Listen, I've been spoiled by Vue's docs. I think the entire industry can agree that Vue's documentation are the best around. Maybe wouldn't have anything to complain about if I had more web development experience.

### Installation

The installation and getting started portions are enough to get started. I highly recommend following along with their docs to install, and get the ball rolling. 

Below is a quick rundown of installation and kicking of a Gridsome project.

```bash
# install gridsome globally, I'm sure a local install is an option
# yarn is also an option. I use npm
npm install --global @gridsome/cli

# start a gridsome project
gridsome create gridsome-from-scratch

cd gridsome-from-scratch
gridsome develop
```

You know the drill. [http://localhost:8080](http://localhost:8080) to see the results. Yeah, Gridsome prints all those details to the terminal too. Be sure to check the [http://localhost:8080/___explore](http://localhost:8080/___explore) page as well, it's a GraphQL playground to explore your sites data.

### Directory structure

The directory should look something like the following (YMMV):

```text
├── package.json
├── gridsome.config.js
├── gridsome.server.js
├── static/
└── src/
    ├── main.js
    ├── index.html
    ├── App.vue
    ├── layouts/
    │   └── Default.vue
    ├── pages/
    │   ├── Index.vue
    │   └── Blog.vue
    └── templates/
        └── BlogPost.vue
```

Important files and folders to know about.

* __gridsome.config.js__ &mdash; configuration options for Gridsome
* __src/main.js__ &mdash; entry JS file for Gridsome. Scripts and styles imported here are available globally? Maybe, not 100% on that yet.
* __src/layouts/__ &mdash; page and application layouts go here.
* __src/pages/__ &mdash; everything in here becomes a page on your website. `src/pages/index.vue` will become `localhost:8080/`, the home page. `src/pages/about.vue` becomes `localhost:8080/about/`, etc.
* __src/templates/__ &mdash; transform data sources into templates located in this folder. Def need more time understanding how this works.

### Configuration

There isn't too much to do here right now. Change the `siteName` prop. Add a `siteURL` prop if you know what that will be. A `siteDescription` might be good to have. All this data becomes available globally for the site. This data can be queried from the GraphQL playground.

```js
// gridsome.config.js
module.exports = {
  siteName: 'Mitchell Gritts\' website',
  siteDescription: 'A personal website and blog for Mitchell Gritts',
  plugins: []
}
```

If you restart the `gridsome develop` process you'll see the site name changes.

Later in this post I'll go into more detail on plugins. 

## Reset all the things!

Keep it simple. Remember that as I begin. Let's start with a black canvas &mdash; *tabula rasa*.

I guess while I'm at it I can add relevent markup to the pages I am resetting. So be prepared for that too. Again, it'll be simple.

### The home page

We'll get started with the homepage since it is the first thing you'll see! Keep it very basic at the beginning. No styles - that'll come later. I promise. Below is my `src/pages/index.vue` page.

```js
<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="/images/nasa_250x250.jpg" width="135" />

    <h1>Howdy! My name is Mitchell Gritts</h1>

    <p>
      a wildlife ecologist, data analyst, and developer based in Reno, NV.
    </p>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: '🤠 Howdy'
  }
}
</script>

<style>
</style>
```

No major changes here:

* Deleted Gridsome links and associated styles.
* Chagned the image to [this one](https://github.com/kissmygritts/beginning-gridsome/blob/master/01-the-reset/static/images/nasa_250x250.jpg) from [NASA](https://mars.nasa.gov/multimedia/resources/mars-posters-explorers-wanted/).
* Altered some of the markup to personalize it. Yes, I do say howdy in real life. No, I'm not from Texas.

Take a look at [the diff on GitHub](https://github.com/kissmygritts/beginning-gridsome/commit/0d6d25c15feae9dcce0cc1856b326b3e14dd76cb).

### The layout

You might notice that the default layout didn't change. Everything is centered, and there is still the nav bar. Reset the layout by making changes to the `src/layouts/Default.vue`. [Layout components](https://gridsome.org/docs/layouts/) are used to wrap pages.

Notice the `<slot />` tag in the .vue file below. All the page content that relies on this layout will be inserted here. This is how [Vue works](https://vuejs.org/v2/guide/components-slots.html). The short of it is slots allow for flexible content templating and distribution within Vue components. As I said earlier Vue's docs are great, read them for more information.

```js
<template>
  <div class="layout">
    <slot/>
  </div>
</template>

<style>
</style>
```

Yeah, I deleted everything. And I'm okay with that for right now. All those design inspo boards will come in handy later.

[Check the diff on GitHub](https://github.com/kissmygritts/beginning-gridsome/commit/59783c2fdee93655aa905e50c160c9e2584349a4).

### The about page

The about page can still be accessed even though there isn't a direct link anymore. Point your browser to `localhost:8080/about/`. Yup! pretty ugly right now. And nothing to delete this time. 

I'm going to add a little bit of information about me. Why I like maintaining a website. And why I think it is important to learn in the open.

```js
<template>
  <Layout>
    <h1>About Me</h1>
    <p>
      I am a wildlife ecologist based in Reno, Nevada.
    </p>

    <p>
      While attending college I taught myself how to program with R. I've been hooked
      ever since then. I continued learning about programing as time allowed. I've 
      since taught myself web development. Fun stuff.
    </p>

    <!-- additional markup check github for full content -->

  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: 'About Me'
  }
}
</script>
```

There wasn't enough variety in the markup I added so I included some lorem ipsum HTML. This will come in handy when we get to styling the website.

[Check the diff on GitHub](https://github.com/kissmygritts/beginning-gridsome/commit/56ad728b1af707862e7e93e07b633190ab277f34).

### The smallest CSS reset

Getting there, but the CSS should be reset a bit in order to start from the scratch. This [post from alligator.io](https://alligator.io/css/minimal-css-reset/) provides a minimal CSS reset. The idea is that most browsers are pretty uniform with the base layouts, so there isn't a need for a complicated reset.

First, create a new folder `src/assets`. Then create a styles file, `src/assets/styles.css`. 

```css
/* src/assets/styles.css */
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}
```

In order to use this file on the site import it within the `src/main.js` file.

```js
// src/main.js
import('~assets/styles.css')

// ... remaining content in the file
```

Simple as that. Of course, there are many ways to deal with CSS and styles. Any number of CSS post-processors can be used. That might be better addressed in a future post. If you insist, check [the documentation](https://gridsome.org/docs/assets-css/#use-sass--css-pre-processors).

All the progress up to this point can be found in [this GitHub repo](https://github.com/kissmygritts/beginning-gridsome/tree/master/01-the-reset). I've broken it into separate folders for each section as I progress. I figure it'll be nice to revisit as necessary. 

<!-- END: 01-the-reset  -->

## Customize it

Head on over to [Pine's website](blog.matsu.io). Very simple pages. Clean typography. Lots of space. Minimalism I suppose. It is beautiful. This will serve as a guide as I continue this Gridsome journey. A North star.

I've started a new folder in the [GitHub repo](https://github.com/kissmygritts/beginning-gridsome/tree/master/02-main-styles) to track the changes made as I go.

### What about a CSS framework

Full disclosure, I struggle with CSS. I never took the time to fully learn the nuances of the language. So no. No CSS frameworks. Especially for something as simple as this. Even though I do *love* tailwindcss. Adam Wathan, congrats. You've built a beautiful framework.

Also, CSS Grid is dope! And I want to figure it all out. I'm sure there will be a use for it on this site at some point.

### Home

Finally, some style! Let's get to it. I know I said Pine's website will be my guide. But I like a bit more information on the homepage. Maybe a short introduction and a photo.

The HTML markup in the template tag changes a liitle bit to better control the layout of the elements. Flexbox will help center content (vertical and horizontal). Then a some fiddling with some of the numbers.

```js
<template>
  <Layout>

    <section class="main">
      <g-image class="main__img img--round" alt="Example image" src="/images/nasa_250x250.jpg" />

      <div class="main__text">
        <h1>Howdy! My name is Mitchell Gritts</h1>
        <p>
          a wildlife ecologist, data analyst, and developer based in Reno, NV.
        </p>
      </div>
    </section>

  </Layout>
</template>

<style scoped>
.main {
  height: 66.6vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main__img {
  width: 180px;
  height: 180px;
  margin-bottom: 24px;
}

.main__text {
  text-align: center;
}

.img--round {
  border-radius: 100%;
}
</style>
```

[Check the diff on GitHub](https://github.com/kissmygritts/beginning-gridsome/commit/675132bb4fb541c141282d88c3a0e7ba7ef86674).

### About

There is a lot of markup on this page. Styling it will be easy. A single centered div should do the trick. Nothing special to this right now. A good ol' `margin: 36px auto;` will do it. Not much code to show here, check the [GitHub diff](https://github.com/kissmygritts/beginning-gridsome/commit/5db7070acee1d37b7d16b85e96032a088eefc243) for the changes.

### Global CSS

I think it is about time to add some more global styles to the `src/assets/styles.css` file. We can change the background colors and text color to make for a more pleasant experience. 

I'm going to use CSS custom properties as I haven't used it very much in the past. I've added a few basic color variables. Then use these variables to change the background color and text color globally.

I'm going to keep it simple for now. This will likely become more complex as I learn more. 

```css
:root {
  --bg-color: #f3f4f6;
  --text-color: #292C38;
  --gray: #6b7393;
  --grey: #6b7393;
  --accent-color: #34E084;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
}
```

## Typography

I think it is time to address the typography. This is a very important topic in web development. And I am bad at it. So this is going to be a great place to experiment with it. Might as well use the About page for now to get the basics out of the way.

My favorite resource for typography is [Better Web Type](https://betterwebtype.com/blog/). Subscribe to Matej's email list and get snippets from his book. He talks a lot about scale and vertical rhythm of the typography. I came across [type-scale.com](https://type-scale.com/) to help generate an appropriate type scale. Play around with this site. There are tons of fonts and inputs to fiddle with.

### Fonts

I'm not an expert when it comes to picking or combining fonts. I know what I like when I see it. I decided to use libre Baskerville for paragraph tags, and libre Franklin for headings. I'm going to see how a Major Third scale works on the about page. 

Now for a bit of decision making. I can push [fonts into the head](https://gridsome.org/docs/assets-fonts/#using-cdn-fonts-typekit-google-fonts-etc). Easy. It is possible, however, to self host the font. I'll do that to see what all of the [fuss is about](https://gridsome.org/docs/assets-fonts/#self-hosting-open-source-typefaces). This way I can install the fonts with `npm`.

```bash
npm install --save typeface-libre-baskerville typeface-libre-franklin
```

then `require` them in the root `index.js` file ([GitHub diff](https://github.com/kissmygritts/beginning-gridsome/commit/79325e6d295bc8260ee1ade2604d6c0019de708b?diff=unified)). It looks very strange to mix require and import statements. I don't like it.

```javascript
// src/main..js
require('typeface-libre-baskerville')
require('typeface-libre-franklin')

// remainder of file...
```

Finally, add the font families to the `src/assets/styles.css` file!

```css
/* src/assets/styles.css */
/* ... remainder of file above ... */

/* TYPOGRAPHY */
body {
  font-family: 'Libre Baskerville', serif;
}

h1, h2, h3, h4, h5 {
  font-family: 'Libre Franklin', sans-serif;
}
```

Coool! Things changed. I'm going to go ahead and add all the additional CSS from type-scale.com. Check the [GitHub diff](https://github.com/kissmygritts/beginning-gridsome/commit/79325e6d295bc8260ee1ade2604d6c0019de708b?diff=unified) for all the changes.

*Note that I've made changes to a few other files as well. I changed the width of the about me content to ems instead of pixels. And added styles for anchor tags.*

That is the final bit of work I will do for the portion of the site. [Check the 02-main-styles](https://github.com/kissmygritts/beginning-gridsome/tree/master/02-main-styles) for a complete look at the project so far.