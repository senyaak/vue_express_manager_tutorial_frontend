import Vue from "vue";
import VueRouter from "vue-router";
import * as Auth from "../components/pages/Authentication";
//pages
import Authentication from "./../components/pages/Authentication/Authentication";
import Home from "../components/pages/Home";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        requiredAuth: true
      }
    }, {
      path: "/login",
      name: "Authentication",
      component: Authentication,
    }
  ]
});

// redirect ro login page if not authenticated
router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push("/login")
    }
  } else {
    next()
  }
})

export default router;
