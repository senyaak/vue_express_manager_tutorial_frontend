import Vue from "vue";
import Component from "vue-class-component";

@Component({
  template: `
<section class="l-budget-list-container">
  <slot name="budget-list-header"></slot>
  <slot name="budget-list-body"></slot>
</section>
`,
})
export default class List extends Vue {

}
