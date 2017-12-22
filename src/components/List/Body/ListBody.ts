import Vue from "vue";
import Component from "vue-class-component";

import template from "./ListBody.html";
import "./ListBody.scss";

@Component({
  template: template,
  props: ["data", "budgetsVisible"],
})
export default class ListBody extends Vue {

}
