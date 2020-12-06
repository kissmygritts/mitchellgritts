---
title: "ESlint, Prettier setup with Nuxt"
date: 2020-12-05
published: true
category: Vue
tags: ["nuxt", "prettier", "eslint"]
canonical_url: false
description: "I never seem to get this right So here we go."
---

I never get these technologies to work together the first go around. My latest problem was updating dependencies in a Nuxt project. I found [this article](https://medium.com/@gogl.alex/how-to-properly-set-up-eslint-with-prettier-for-vue-or-nuxt-in-vscode-e42532099a9c) which helped me figure it out.

The gist of the problem was that my `.prettierrc` wasn't recognized by ESLint and those errors show up as errors in the terminal and browser after updating. The immediate solution was [deleting the `.eslintcache`](https://eslint.org/docs/user-guide/command-line-interface#caching).

Then when everything seems to fail I restart VSCode to force the Prettier plugin to restart with the new `.prettierrc` rules. 

Here are a collection of files that helped get it working in my project.

```json
// `.prettierrc`
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none"
}
```

```js
// eslintrc.js
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {}
}
```

```js
// nuxt.config.js
export default {
  // .. other nuxt config options
  
  buildModules: [
    '@nuxtjs/eslint-module',
    // ... other buildModules
  ]

  // ... even more nuxt config options
}
```

A lot of this tooling is a mystery to me. Nuxt normally takes care of mixing all these things together and it's plug and play. But updates seem to cause a ew problems. 