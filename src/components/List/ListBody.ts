import Vue from "vue";
import Component from "vue-class-component";

import "./ListBody.scss";

@Component({
  template:`
<section class="l-budget-body">
   <div class="md-budget" v-if="budgets != null" v-for="budget in budgets">
     <div class="md-budget-info white--text">{{ budget.client }}</div>
     <div class="md-budget-info white--text">{{ budget.title }}</div>
     <div class="md-budget-info white--text">{{ budget.state }}</div>
     <div class="l-budget-actions">
       <v-btn small flat color="light-blue lighten-1">
         <v-icon small>visibility</v-icon>
       </v-btn>
       <v-btn small flat color="yellow accent-1">
         <v-icon>mode_edit</v-icon>
       </v-btn>
       <v-btn small flat color="red lighten-1">
         <v-icon>delete_forever</v-icon>
       </v-btn>
     </div>
   </div>
 </section>
`,
  props: ["budgets"],
})
export default class ListBody extends Vue {

}
