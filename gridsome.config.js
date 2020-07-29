// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Mitchell Gritts',
  siteUrl: 'https://mitchellgritts.com',

  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: [
        [ 'gridsome-plugin-remark-shiki', { theme: 'nord', skipInline: true } ]
      ]
    }
  },

  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/**/*.md',
        refs: {
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    },
    // creating a second source for a ./content/digital-garden
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'DigitalGarden',
        path: 'content/digital-garden/*.md',
        refs: {
          topic: {
            typeName: 'Topic',
            create: true
          }
        }
      }
    }
  ],

  templates: {
    Post: '/posts/:title',
    DigitalGarden: '/digital-garden/:title',
    Topic: '/topics/:id'
  }
}
