import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import {Budget} from '@/models/Budget';
import {Client} from '@/models/Client';

import template from './ListBody.html';
import './ListBody.scss';

@Component({
  template: template,
})
export default class ListBody extends Vue {
  @Prop(Array) data!: Budget[]|Client[];
  @Prop(Boolean) budgetsVisible!: boolean|null;
  @Prop(Function) deleteItem!: (item) => void;
  @Prop(Function) getBudget!: (item: Budget|Client) => void;
  @Prop(Function) getClient!: (item: Budget|Client) => void;
  @Prop(Array) parsedBudgets!: Budget[];

  getItemAndEdit (item) {
     !item.phone ? this.getBudget(item) : this.getClient(item);
  }
}
