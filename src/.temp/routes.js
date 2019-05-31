export default [
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "component--home" */ "/Users/mitchellgritts/Documents/sandbox/web/gridsome/website/src/pages/Index.vue")
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "component--404" */ "/Users/mitchellgritts/Documents/sandbox/web/gridsome/website/node_modules/gridsome/app/pages/404.vue"),
    meta: { isIndex: false }
  },
  {
    name: "tag",
    path: "/tag/:id",
    component: () => import(/* webpackChunkName: "component--tag" */ "/Users/mitchellgritts/Documents/sandbox/web/gridsome/website/src/templates/Tag.vue")
  },
  {
    name: "post",
    path: "/:slug",
    component: () => import(/* webpackChunkName: "component--post" */ "/Users/mitchellgritts/Documents/sandbox/web/gridsome/website/src/templates/Post.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "component--404" */ "/Users/mitchellgritts/Documents/sandbox/web/gridsome/website/node_modules/gridsome/app/pages/404.vue"),
    meta: { isIndex: false }
  }
]

