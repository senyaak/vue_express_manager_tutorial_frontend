import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import {Budget} from '@/models/Budget';
import {Client} from '@/models/Client';

import BudgetCreation from './Budget/BudgetCreation/BudgetCreation';
import BudgetEdit from './Budget/BudgetEdit/BudgetEdit';
import ClientCreation from './Client/ClientCreation/ClientCreation';
import ClientEdit from './Client/ClientEdit/ClientEdit';
import template from './Create.html';

@Component({
  template: template,
  components: {
    'budget-creation': BudgetCreation,
    'budget-edit': BudgetEdit,
    'client-creation': ClientCreation,
    'client-edit': ClientEdit,
  },
})
export default class Create extends Vue {
  @Prop(Boolean) budgetCreation!: boolean;
  @Prop(Boolean) editPage!: boolean;
  @Prop(Boolean) budgetEdit!: boolean;
  @Prop(Array) clients!: Client[];
  @Prop(Function) saveBudget!: () => void;
  @Prop(Function) saveClient!: () => void;
  @Prop(Function) fixClientNameAndUpdate!: () => void;
  @Prop(Function) updateClient!: () => void;
  @Prop(Object) budget!: Budget;
  @Prop(Object) client!: Client;
}
