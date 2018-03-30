import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import {Budget, BudgetItem} from '@/models/Budget';
import {Client} from '@/models/Client';

import './BudgetCreation.scss';
import {BudgetAbstract} from './../Budget';
import template from './BudgetCreation.html';

@Component({
  template: template,
})
export default class BudgetCreation extends BudgetAbstract {
  @Prop(Array) clients!: Client[];
  @Prop(Function) saveBudget!: () => null;
}
