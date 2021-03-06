// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(store => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    if (process.env.NODE_ENV === 'production') {
      const posts = store.getCollection('Post')

      posts.data().forEach(node => {
        if (node.published !== true) {
          posts.removeNode(node.id)
        }
      })
    }
  })

  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  })
}
