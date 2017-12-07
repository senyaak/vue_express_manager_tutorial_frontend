import Vue from "vue";
import Axios from "axios";
// import "vue-cookie/types/index";
import router from "./../../../router/index";
// import Authentication from "./Authentication";

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
        .then(({data: {token}}) => {
          context.$cookie.set('token', token, '1D')
          context.validLogin = true
          this.user.authenticated = true

          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  signup (context: Authentication, credentials: Credentials, redirect?: string) {
    Axios.post(`${BudgetManagerAPI}/api/v1/signup`, credentials)
        .then(({data: {token}}) => {
          context.$cookie.set('token', token, '1D')
          context.validSignUp = true
          this.user.authenticated = true

          if (redirect) router.push(redirect)
        }).catch(({response: {data}}) => {
          context.snackbar = true
          context.message = data.message
        })
  },

  checkAuthentication () {
    const token = document.cookie

    if (token) this.user.authenticated = true
    else this.user.authenticated = false
  },

  getAuthenticationHeader (context: Authentication) {
    return `Bearer ${context.$cookie.get('token')}`
  }
}
