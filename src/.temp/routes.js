const c1 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/templates/Post.vue")
const c2 = () => import(/* webpackChunkName: "page--src--templates--digital-garden-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/templates/DigitalGarden.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--digital-garden-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/pages/DigitalGarden.vue")
const c4 = () => import(/* webpackChunkName: "page--src--pages--about-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/pages/About.vue")
const c5 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/node_modules/gridsome/app/pages/404.vue")
const c6 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/mitchellgritts/Documents/projects/web/blog.mitchellgritts.com/src/pages/Index.vue")

export default [
  {
    path: "/posts/:title/",
    component: c1
  },
  {
    path: "/digital-garden/:title/",
    component: c2
  },
  {
    path: "/digital-garden/",
    component: c3
  },
  {
    path: "/about/",
    component: c4
  },
  {
    name: "404",
    path: "/404/",
    component: c5
  },
  {
    name: "home",
    path: "/",
    component: c6
  },
  {
    name: "*",
    path: "*",
    component: c5
  }
]
