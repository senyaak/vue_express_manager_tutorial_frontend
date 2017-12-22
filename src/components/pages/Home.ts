import Vue from "vue";
import Component from "vue-class-component";
import Axios from 'axios';

import Authentication from "./Authentication";
import ListBody from "../List/Body/ListBody";
import ListHeader from "../List/Header/ListHeader";
import Config from "./../../Config";
import template from "./Home.html";
import "./Home.scss";

@Component({
  template: template,
  components: {
    "list-header": ListHeader,
    "list-body": ListBody,
  },
})
export default class Home extends Vue {
  // FIXME change any
  budgets: any[] = [];
  clients: any[] = [];
  budgetHeaders: string[] = ['Client', 'Title', 'Status', 'Actions'];
  clientHeaders: string[] = ['Client', 'Email', 'Phone', 'Actions'];
  budgetsVisible: boolean = false;
  snackbar: boolean = false;
  timeout: number = 6000;
  message: string = '';
  fab: boolean = false;

  mounted() {
    this.getAllBudgets();
    this.getAllClients();
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
    }).then(({data}) => {
      this.budgets = this.dataParser(data, "_id", "client", "title", "state");
    }).catch((error: Error) => {
      this.snackbar = true;
      this.message = error.message
    });
  };
  getAllClients () {
    Axios.get(`${Config.BudgetManagerAPI}/api/v1/client`, {
      headers: {
        Authorization: Authentication.getAuthenticationHeader(this)
      },
      params: {
        // FIXME ts-loader bug
        user_id: (<any>this).$cookie.get("user_id"),
      },
    }).then(({data}) => {
      this.clients = this.dataParser(data, '_id', 'client', 'email', 'phone')
    }).catch(error => {
      this.snackbar = true
      this.message = error.message
    })
  };
  dataParser (targetedArray, ...options) {
    let parsedData: any[] = []
    targetedArray.forEach(item => {
      let parsedItem: any = {}
      options.forEach(option => (parsedItem[option] = item[option]))
      parsedData.push(parsedItem)
    });
    return parsedData
  };
}
