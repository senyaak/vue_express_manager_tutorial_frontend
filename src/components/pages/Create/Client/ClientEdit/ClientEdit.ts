import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

import {Client} from '@/models/Client';

import './ClientEdit.scss';
import template from './ClientEdit.html';

@Component({
  template: template,
})
export default class ClientEdit extends Vue {
  @Prop(Function) updateClient!: () => void;
  @Prop(Object) selectedClient!: Client;
  client: Client = new Client();
  mounted() {
    this.client = this.selectedClient;
  }
}
