import Vue from 'vue';
import Component from 'vue-class-component';

import {Prop} from 'vue-property-decorator';

import Authentication from './../../pages/Authentication';
import template from './ListHeader.html';
import './ListHeader.scss';

@Component({
  template: template,
})
export default class ListHeader extends Vue {
  @Prop(Array) headers!: string[];
}
