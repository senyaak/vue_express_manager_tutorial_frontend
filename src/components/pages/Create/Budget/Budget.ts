import Vue from 'vue';

import {Budget, BudgetItem, BudgetState} from '@/models/Budget';
export abstract class BudgetAbstract extends Vue {
  budget: Budget = new Budget();
  states: BudgetState[] = <BudgetState[]>Object.keys(BudgetState)
  addItem() {
    this.budget!.items.push(new BudgetItem());
  }
  removeItem (selected) {
    let index = this.budget!.items.indexOf(selected);
    this.budget!.items.splice(index, 1);
  }
}
