import Vue from "vue";
import Vuetify from "vuetify"
Vue.use(Vuetify);
import * as VueCookie from "vue-cookie";
Vue.use(VueCookie);

import Authentication from "./components/pages/Authentication";
import App from "./components/App";
import Router from "./router/index";
import("./../node_modules/vuetify/dist/vuetify.min.css");
Vue.config.productionTip = false;

// check auth on load (without this we should login every time page loads)
Authentication.checkAuthentication();

let v = new Vue({
  router: Router,
  template: "<app></app>",
  el: "root",
  components: {
    App,
  },
});
