export default [
  {
    path: "/about/",
    component: () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/pages/About.vue")
  },
  {
    name: "404",
    path: "/404/",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/node_modules/gridsome/app/pages/404.vue")
  },
  {
    path: "/:title/",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/templates/Post.vue")
  },
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/pages/Index.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/node_modules/gridsome/app/pages/404.vue")
  }
]

