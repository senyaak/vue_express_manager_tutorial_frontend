import Vue from "vue";
import Component from "vue-class-component";
import RouterView from "vue";
import "./App.scss";
@Component({
  template: `
  <div class="test">
    APP
    <router-view/>
  </div>
`,
})
export default class App extends Vue {
  components: [
    RouterView
  ];
  // @Prop() name: string;
};
