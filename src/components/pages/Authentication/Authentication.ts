import Vue from "vue";
import Component from "vue-class-component";
import AuthenticationCtr from "./index";
import { Credentials } from "./index";
import template from "./Authentication.html";
import "./Authentication.scss";

@Component({
  template: template,
})
export default class Authentication extends Vue {
  validLogin: boolean = false;
  snackbar: boolean = false;
  validSignUp: boolean = false;
  signUpVisible: boolean = false;
  loginPasswordVisible: boolean = false;
  signUpPasswordVisible: boolean = false;
  rules: Array<Function>  = [
    (value: any) => {
      return !!value || "This field is required"
    },
  ];
  credentials: Credentials = new Credentials("", "");
  newUser: Credentials = new Credentials("", "");
  message: string = "";

  submitAuthentication() {
    AuthenticationCtr.authenticate(this, this.credentials, "/");
  };
  submitSignUp() {
    AuthenticationCtr.signup(this, this.newUser, "/")
  };
};
