import Vue from "vue";
import Component from "vue-class-component";

// The @Component decorator indicates the class is a Vue component
@Component({
  // All component options are allowed in here
  template: '<button @click="onClick">Click!</button>'
})
export default class App extends Vue {
}
