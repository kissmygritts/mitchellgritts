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
        path: 'content/posts/**/*.md',
        typeName: 'Post'
      }
    },
    // creating a second source for a ./content/digital-garden
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/digital-garden/*.md',
        typeName: 'DigitalGarden'
      }
    }
  ],

  templates: {
    Post: '/:title',
    DigitalGarden: '/digital-garden/:title'
  }
}
