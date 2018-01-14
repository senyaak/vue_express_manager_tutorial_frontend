import Vue from "vue";
import Axios from "axios";
// FIXME ts-loader bug
// import "vue-cookie/types/index";
// import Authentication from "./Authentication";
import router from "./../../../router/index";

const BudgetManagerAPI = `http://${window.location.hostname}:3001`

export class Credentials {
  constructor(
    public username: string,
    public password: string,
  ){}
}
type Authentication = any;
export default {
  user: { authenticated: false },
  authenticate (context: Authentication, credentials: Credentials, redirect?: string) {
    Axios.post(`${BudgetManagerAPI}/api/v1/auth`, credentials)
        .then(({data}) => {
          context.$cookie.set('token', data.token, '1D');
          context.$cookie.set('user_id', data.user._id, '1D');
          context.validLogin = true;
          this.user.authenticated = true;

          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true;
          context.message = data.message;
        })
  },

  signup (context: Authentication, credentials: Credentials, redirect?: string) {
    Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
        .then(({data: {token}}) => {
          context.validSignUp = true

          this.authenticate(context, credentials, redirect);
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  signout(context: Authentication, redirect?: string) {
      context.$cookie.delete('token');
      context.$cookie.delete('user_id');
      this.user.authenticated = false;

      if (redirect) router.push(redirect);
  },

  checkAuthentication () {
    const token = document.cookie;
    this.user.authenticated = !!token;
  },

  getAuthenticationHeader (context: Authentication) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
