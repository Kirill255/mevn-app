import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

import NProgress from "nprogress";

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    },
    {
      path: "/posts",
      name: "Posts",
      component: () =>
        import(/* webpackChunkName: "posts" */ "@/views/PostsPage.vue")
    },
    {
      path: "/posts/new",
      name: "NewPost",
      component: () =>
        import(/* webpackChunkName: "newpost" */ "@/views/NewPostPage.vue")
    },
    {
      path: "/posts/:id",
      name: "EditPost",
      component: () =>
        import(/* webpackChunkName: "editpost" */ "@/views/EditPostPage.vue")
    },
    {
      path: "*",
      component: () => import(/* webpackChunkName: "e404" */ "@/views/E404.vue")
    }
  ]
});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
