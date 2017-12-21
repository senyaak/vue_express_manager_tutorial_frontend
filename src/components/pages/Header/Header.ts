import Vue from "vue";
import Component from "vue-class-component";

import Authentication from "./../Authentication";
import "./Header.scss";

@Component({
  template: `
<header class="l-header-container">
  <v-layout row wrap>
    <v-flex xs12 md5>
      <v-text-field v-model="search"
                    label="Search"
                    append-icon="search"
                    color="light-blue lighten-1">
      </v-text-field>
    </v-flex>

    <v-flex xs12 offset-md1 md1>
      <v-btn block color="light-blue lighten-1">Clients</v-btn>
    </v-flex>

    <v-flex xs12 offset-md1 md2>
      <v-select label="Status"
                color="light-blue lighten-1"
                v-model="status"
                :items="statusItems"
                single-line>
      </v-select>
    </v-flex>

    <v-flex xs12 offset-md1 md1>
      <v-btn block color="red lighten-1 white--text" @click.native="submitSignout()">Sign out</v-btn>
    </v-flex>
  </v-layout>
</header>
`
})
export default class Header extends Vue {
  search: string = "";
  status: string = "";
  statusItems: string[] = [
    "All", "Approved", "Denied", "Waiting", "Writing", "Editing"
  ];
  submitSignout () {
    Authentication.signout(this, '/login')
  }
};
