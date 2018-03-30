import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';

import {BudgetState} from '@/models/Budget';

import Authentication from '@/components/pages/Authentication';
import template from './Header.html';
import './Header.scss';


@Component({
  template: template,
})
export default class Header extends Vue {
  @Prop(Boolean) budgetsVisible!: Boolean;
  @Prop() selectState;
  @Prop(String) search!: string;
  status: string = '';
  searchValue: string = '';
  statusItems: BudgetState[] = <BudgetState[]>Object.keys(BudgetState);

  submitSignout () {
    Authentication.signout(this, '/login');
  }

  @Watch('searchValue')
  onSearchValueChanged() {
    this.$emit('input', this.searchValue);
  }

  created () {
    this.searchValue = this.search;
  }
};
