import Vue from "vue";
import VueRouter from "vue-router";
import * as Auth from "../components/pages/Authentication";
//pages
import Authentication from "./../components/pages/Authentication/Authentication";
import Home from "../components/pages/Home";

// Global components
import Header from "@/components/pages/Header/Header";
import List from "@/components/List/List";
import Create from "@/components/pages/Create/Create";

// Register components
Vue.component("app-header", Header);
Vue.component("list", List)

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "Home",
      components: {
        default: Home,
        header: Header,
        list: List,
        create: Create,
      },
      // meta: {
      //   requiredAuth: true
      // }
    }, {
      path: "/login",
      name: "Authentication",
      component: Authentication,
    }
  ]
});

// redirect ro login page if not authenticated
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (Auth.default.user.authenticated) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router;
