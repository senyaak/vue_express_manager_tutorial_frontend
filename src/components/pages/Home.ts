import Vue from 'vue';
import Component from 'vue-class-component';
import Axios from 'axios'
import {Prop, Watch} from 'vue-property-decorator';
import * as VueCookie from 'vue-cookie';
declare module "vue/types/vue" {
  interface Vue {
    $cookie: VueCookie;
  }
}

import Authentication from '@/components/pages/Authentication';
import ListHeader from '@/components/List/Header/ListHeader';
import ListBody from '@/components/List/Body/ListBody';
import Create from '@/components/pages/Create/Create';

import {Budget} from '@/models/Budget';
import {Client} from '@/models/Client';

import template from './Home.html';
import './Home.scss';

const BudgetManagerAPI = `http://${window.location.hostname}:3001`
@Component({
  template: template,
  components: {
    'list-header': ListHeader,
    'list-body': ListBody,
    'create': Create,
  },
})
export default class Home extends Vue {
  parsedBudgets: Budget[] = [];
  budget: Budget|null = null;
  client: Client|null = null;
  state = null;
  search = null;
  budgets: Budget[] = [];
  clients: Client[] = [];
  budgetHeaders: string[] = ['Client', 'Title', 'Status', 'Actions'];
  clientHeaders: string[] = ['Client', 'Email', 'Phone', 'Actions'];
  budgetsVisible = true;
  snackbar = false;
  timeout = 6000;
  message = '';
  fab = false;
  listPage = true;
  createPage = false;
  editPage = false;
  budgetCreation = true;
  budgetEdit = true;
  snackColor = 'red lighten-1';
  hidden: boolean = true;

  mounted () {
    this.getAllBudgets();
    this.getAllClients();
    this.hidden = false;
  }

  @Watch('search')
  onSearchChanged() {
    if (this.search !== null || this.search !== '') {
      const searchTerm = this.search
      const regex = new RegExp(`^(${searchTerm})`, 'g')
      const results = this.budgets.filter(budget => budget.client.match(regex))
      this.parsedBudgets = results
    } else {
      this.parsedBudgets = []
    }
  }
  getAllBudgets () {
    Axios.get(`${BudgetManagerAPI}/api/v1/budgets`, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id') }
    }).then(({data}) => {
      this.budgets = this.dataParser(data, '_id', 'client', 'title', 'state', 'client_id')
    }).catch(error => {
      this.errorHandler(error)
    })
  }
  getAllClients () {
    Axios.get(`${BudgetManagerAPI}/api/v1/client`, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id') }
    }).then(({data}) => {
      this.clients = this.dataParser(data, 'name', 'email', '_id', 'phone')
    }).catch(error => {
      this.errorHandler(error)
    })
  }
  getBudget (budget) {
    Axios.get(`${BudgetManagerAPI}/api/v1/budget/single`, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: {
        user_id: this.$cookie.get('user_id'),
        _id: budget._id
      }
    }).then(({data}) => {
      this.budget = data
      this.enableEdit('budget')
    }).catch(error => {
      this.errorHandler(error)
    })
  }
  getClient (client) {
    Axios.get(`${BudgetManagerAPI}/api/v1/client/single`, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: {
        user_id: this.$cookie.get('user_id'),
        _id: client._id
      }
    }).then(({data}) => {
      this.client = data
      this.enableEdit('client')
    }).catch(error => {
      this.errorHandler(error)
    })
  }
  enableEdit (type) {
    if (type === 'budget') {
      this.createPage = true;
      this.listPage = false;
      this.budgetEdit = true;
      this.budgetCreation = false;
      this.editPage = true;
    } else if (type === 'client') {
      this.createPage = true;
      this.listPage = false;
      this.budgetEdit = false;
      this.budgetCreation = false;
      this.editPage = true;
    }
  }
  saveBudget (budget) {
    Axios.post(`${BudgetManagerAPI}/api/v1/budgets`, budget, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id') }
    })
    .then(res => {
      this.resetFields(budget)
      this.snackbar = true
      this.message = res.data.message
      this.snackColor = 'green lighten-1'
      this.getAllBudgets()
    })
    .catch(error => {
      this.errorHandler(error)
    })
  }
  fixClientNameAndUpdate (budget) {
    this.clients.forEach(client => {
      if (client._id === budget.client_id) {
        budget.client = client.name
      }
    })
    this.updateBudget(budget)
  }
  updateBudget (budget) {
    Axios.put(`${BudgetManagerAPI}/api/v1/budget/single`, budget, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id') }
    })
    .then(() => {
      this.snackbar = true
      this.message = 'Budget updated'
      this.snackColor = 'green lighten-1'
      this.listPage = true
      this.budgetCreation = false
      this.budgetsVisible = true
      this.getAllBudgets()
    })
    .catch(error => {
      this.errorHandler(error)
    })
  }
  updateClient (client) {
    Axios.put(`${BudgetManagerAPI}/api/v1/client/single`, client, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id') }
    })
    .then(() => {
      this.snackbar = true
      this.message = 'Client updated'
      this.snackColor = 'green lighten-1'
      this.listPage = true
      this.budgetCreation = false
      this.budgetsVisible = false
      this.getAllClients()
    })
    .catch(error => {
      this.errorHandler(error)
    })
  }
  saveClient (client) {
    Axios.post(`${BudgetManagerAPI}/api/v1/client`, client, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id') }
    })
    .then(res => {
      this.resetFields(client)
      this.snackbar = true
      this.message = res.data.message
      this.snackColor = 'green lighten-1'
      this.getAllClients()
    })
    .catch(error => {
      this.errorHandler(error)
    })
  }
  deleteItem (selected, items, api) {
    let targetApi = ''
    api ? targetApi = 'budgets' : targetApi = 'client'
    Axios.delete(`${BudgetManagerAPI}/api/v1/${targetApi}`, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: {
        user_id: this.$cookie.get('user_id'),
        _id: selected._id
      }
    })
    .then(() => {
      this.removeItem(selected, items)
    })
    .then(() => {
      api ? this.getAllBudgets() : this.getAllClients()
    })
    .catch(error => {
      this.errorHandler(error)
    })
  }
  errorHandler (error) {
    const status = error.response.status
    this.snackbar = true
    this.snackColor = 'red lighten-1'
    if (status === 404) {
      this.message = 'Invalid request'
    } else if (status === 401 || status === 403) {
      this.message = 'Unauthorized'
    } else if (status === 400) {
      this.message = 'Invalid or missing information'
    } else {
      this.message = error.message
    }
  }
  removeItem (selected, items) {
    items.forEach((item, index) => {
      if (item === selected) {
        items.splice(index, 1)
      }
    })
  }
  dataParser (targetedArray, ...options: string[]) {
    let parsedData: any[] = []
    targetedArray.forEach(item => {
      let parsedItem: any = {}
      options.forEach(option => (parsedItem[option] = item[option]))
      parsedData.push(parsedItem)
    })
    return parsedData
  }
  resetFields (item) {
    for (let key in item) {
      item[key] = null
      if (key === 'quantity' || key === 'price') {
        item[key] = 0
      }
      item['items'] = []
    }
  }
  selectState (state) {
    this.state = state
    state === 'all' ? this.getAllBudgets() : this.getBudgetsByState(state)
  }
  getBudgetsByState (state) {
    Axios.get(`${BudgetManagerAPI}/api/v1/budget/state`, {
      headers: { 'Authorization': Authentication.getAuthenticationHeader(this) },
      params: { user_id: this.$cookie.get('user_id'), state }
    }).then(({data}) => {
      this.budgets = this.dataParser(data, '_id', 'client', 'title', 'state', 'client_id')
    }).catch(error => {
      this.errorHandler(error)
    })
  }
}
