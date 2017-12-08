import Vue from "vue";
import Component from "vue-class-component";
import Axios from 'axios';
import Authentication from './Authentication';
import Config from "./../../Config";

@Component({
  template: `
  <div>
    <h3>Hi! this is our App's Home</h3>
    <ul>
      <li v-if="users != null" v-for="user in users">
        {{ user.username }}
      </li>
    </ul>
  </div>
`
})
export default class Home extends Vue {
  users = [];
  mounted() {
    this.getAllUsers()
  };
  getAllUsers(context?: Vue) {
    Axios.get(`${Config.BudgetManagerAPI}/api/v1/users`, {
      headers: {
        'Authorization': Authentication.getAuthenticationHeader(this)
      }
    }).then(({data}) => (this.users = data));
  }
}
