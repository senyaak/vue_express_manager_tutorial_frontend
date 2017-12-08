import Vue from "vue";
import App from "./components/App";
import Router from "./router/index";
import Vuetify from "vuetify"
Vue.use(Vuetify);
import * as VueCookie from "vue-cookie";
Vue.use(VueCookie);
import("./../node_modules/vuetify/dist/vuetify.min.css");
Vue.config.productionTip = false;

let v = new Vue({
  router: Router,
  template: "<app></app>",
  el: "root",
  components: {
    App,
  },
});
