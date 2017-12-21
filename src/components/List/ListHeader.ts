import Vue from "vue";
import Component from "vue-class-component";

import "./ListHeader.scss";

@Component({
  template:`
  <header class="l-budget-header">
    <div class="md-budget-header white--text">Client</div>
    <div class="md-budget-header white--text">Title</div>
    <div class="md-budget-header white--text">Status</div>
    <div class="md-budget-header white--text">Actions</div>
  </header>
`,
})
export default class ListHeader extends Vue {

}
