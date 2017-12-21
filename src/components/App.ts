import Vue from "vue";
import Component from "vue-class-component";
import RouterView from "vue";
import "./App.scss";
@Component({
  template: `
  <v-app>
    <v-container>
      <router-view/>
    </v-container>
  </v-app>`,
})
export default class App extends Vue {
  components: [
    RouterView
  ];
  // @Prop() name: string;
};
