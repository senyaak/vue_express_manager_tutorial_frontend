import Vue from "vue";
import Component from "vue-class-component";

import Authentication from "./../Authentication";
import template from "./Header.html";
import "./Header.scss";

@Component({
  template: template,
  props: ["budgetsVisible"],
})
export default class Header extends Vue {
  search: string = "";
  status: string = "";
  statusItems: string[] = [
    "All", "Approved", "Denied", "Waiting", "Writing", "Editing"
  ];
  submitSignout () {
    Authentication.signout(this, '/login')
  }
};
