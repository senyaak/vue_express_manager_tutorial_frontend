import Vue from "vue";
import Component from "vue-class-component";
import Axios from 'axios';

import Authentication from "./Authentication";
import ListBody from "../List/ListBody";
import ListHeader from "../List/ListHeader";
import Config from "./../../Config";
import "./Home.scss";

@Component({
  template: `
<main class="l-home-page">
  <app-header></app-header>

  <div class="l-home">
    <h4 class="white--text text-xs-center my-0">
      Focus Budget Manager
    </h4>

    <budget-list>
      <budget-list-header slot="budget-list-header"></budget-list-header>
      <budget-list-body slot="budget-list-body" :budgets="budgets"></budget-list-body>
    </budget-list>
  </div>
</main>
`,
  components: {
    "budget-list-header": ListHeader,
    "budget-list-body": ListBody,
  },
})
export default class Home extends Vue {
  budgets = [];
  mounted() {
    this.getAllBudgets()
  };
  getAllBudgets(context?: Vue) {
    Axios.get(`${Config.BudgetManagerAPI}/api/v1/budgets`, {
      headers: {
        Authorization: Authentication.getAuthenticationHeader(this),
      },
      params: {
        // FIXME ts-loader bug
        user_id: (<any>this).$cookie.get("user_id"),
      },
    }).then(({data}) => (this.budgets = data));
  }
}
