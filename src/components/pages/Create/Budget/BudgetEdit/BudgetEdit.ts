import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import {Client} from '@/models/Client';
import {Budget, BudgetItem, BudgetState} from '@/models/Budget';

import {BudgetAbstract} from './../Budget';
import './BudgetEdit.scss';
import template from './BudgetEdit.html';

@Component({
  template: template,
})
export default class BudgetEdit extends BudgetAbstract {
  @Prop(Array) clients!: Client[];
  @Prop(Function) fixClientNameAndUpdate!: () => void;
  @Prop(Object) selectedBudget!: Budget;

  mounted() {
    this.parseBudget()
  }

  parseBudget () {
    for (let key in this.selectedBudget) {
      if (key !== 'total' && key !== 'items') {
        this.budget[key] = this.selectedBudget[key]
      }
      if (key === 'items') {
        const items = this.selectedBudget.items
        const buildItems = item => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          get subtotal () {
            return this.quantity * this.price
          }
        })
        const parseItems = items => items.map(buildItems)
        this.budget.items = parseItems(items)
      }
    }
  }
}
