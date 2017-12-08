import Vue from "vue";
import Component from "vue-class-component";
import AuthenticationCtr from "./index";
import { Credentials } from "./index";
import "./Authentication.scss";

@Component({
  template: `
  <div class="l-auth-container">
     <div class="l-auth">
       <v-form v-model="validLogin">
         <v-text-field label="Username"
                       v-model="credentials.username"
                       prepend-icon="account_box"
                       :rules="rules"
                       required
                       color="light-blue lighten-1">
         </v-text-field>

         <v-text-field label="Password"
                       v-model="credentials.password"
                       prepend-icon="lock"
                       :rules="rules"
                       :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                       :append-icon-cb="() => (loginPasswordVisible = !loginPasswordVisible)"
                       :type="loginPasswordVisible ? 'text' : 'password'"
                       color="light-blue lighten-1"
                       required>
         </v-text-field>

         <v-btn flat color="light-blue lighten-1" @click.native="signUpVisible = true">Create account</v-btn>
         <v-btn color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
       </v-form>
     </div>

     <div class="l-signup" v-if="signUpVisible">
       <v-form v-model="validSignUp">
         <v-text-field label="Username"
                       v-model="newUser.username"
                       prepend-icon="account_box"
                       :rules="rules"
                       required
                       color="light-blue lighten-1">
         </v-text-field>

         <v-text-field label="Password"
                       v-model="newUser.password"
                       prepend-icon="lock"
                       :rules="rules"
                       :append-icon="signUpPasswordVisible ? 'visibility' : 'visibility_off'"
                       :append-icon-cb="() => (signUpPasswordVisible = !signUpPasswordVisible)"
                       :type="signUpPasswordVisible ? 'text' : 'password'"
                       color="light-blue lighten-1"
                       required>
         </v-text-field>

         <v-btn block color="light-blue lighten-1" @click.native="submitSignUp()">Sign Up</v-btn>
       </v-form>
     </div>
     <!-- -->
     <v-snackbar timeout="6000"
                 bottom="bottom"
                 color="red lighten-1"
                 v-model="snackbar">
       {{ message }}
     </v-snackbar>
   </div>
`
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
