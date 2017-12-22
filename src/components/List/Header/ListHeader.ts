import Vue from "vue";
import Component from "vue-class-component";

import Authentication from "./../../pages/Authentication";
import template from "./ListHeader.html";
import "./ListHeader.scss";

@Component({
  template: template,
  props: ["headers"],
})
export default class ListHeader extends Vue {
}
