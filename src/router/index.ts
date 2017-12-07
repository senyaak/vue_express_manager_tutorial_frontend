import Vue from "vue";
import VueRouter from "vue-router";

//pages
import Authentication from "./../components/pages/Authentication/Authentication";

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: "/login",
      name: "Authentication",
      component: Authentication,
    }
  ]
});
