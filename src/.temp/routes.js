export default [
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/pages/Index.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/node_modules/gridsome/app/pages/404.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/:slug",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/templates/Post.vue"),
    meta: {
      data: true
    }
  },
  {
    path: "/tag/:id",
    component: () => import(/* webpackChunkName: "page--src--templates--tag-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/templates/Tag.vue"),
    meta: {
      data: true
    }
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/node_modules/gridsome/app/pages/404.vue"),
    meta: {
      data: true
    }
  }
]

