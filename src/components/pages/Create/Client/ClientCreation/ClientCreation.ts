import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import {Client} from '@/models/Client';

import './ClientCreation.scss';
import template from './ClientCreation.html';

@Component({
  template: template,
})
export default class ClientCreation extends Vue {
  @Prop(Function) saveClient!: () => void;
  client: Client = new Client();
 }
