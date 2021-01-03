<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="#f3d250">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">
        catkin | {{ currentGroup }}
        <span class="font-weight-light"></span>
      </span>
      <v-spacer></v-spacer>
      <!-- <v-text-field solo-inverted flat hide-details label="Search" prepend-inner-icon="search"></v-text-field> -->
      <v-btn
        v-if="isLoggedIn"
        color="#5DA2D5"
        dark
        @click.stop="
          id = 'newitem';
          dialog = true;
          forceRerender();
        "
      >
        <v-icon>note_add</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" max-width="80%">
        <v-card>
          <KanbanDetail :id="id" :key="newItemComponentKey" />
        </v-card>
      </v-dialog>

      <!-- filter panel disabled as not yet implemented on backend -->
      <v-menu
        v-if="false"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template #activator="{ on }">
          <v-btn color="indigo" dark v-on="on">
            <v-icon>filter_list</v-icon>
          </v-btn>
        </template>
        <BoardFilters />
      </v-menu>

      <!-- activity feed disabled as not yet implemented on backend -->
      <v-menu
        v-if="false"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template #activator="{ on }">
          <v-btn color="indigo" dark v-on="on">
            <v-icon>rss_feed</v-icon>
          </v-btn>
        </template>
        <v-card>
          <NewsFeed />
        </v-card>
      </v-menu>
      <v-menu
        v-if="isLoggedIn"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-if="isLoggedIn" #activator="{ on }">
          <v-btn
            v-if="isLoggedIn"
            color="#5DA2D5"
            class="ml-2"
            dark
            @click="handleLogout()"
            v-on="on"
            >Logout</v-btn
          >
        </template>
      </v-menu>

      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template #activator="{ on }">
          <v-btn
            v-if="!isLoggedIn"
            color="#5DA2D5"
            dark
            class="ml-2"
            @click="handleLogin()"
            v-on="on"
            >Login</v-btn
          >
        </template>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="mini"
      app
      clipped
      color="grey lighten-4"
    >
      <v-list dense class="grey lighten-4">
        <template v-for="(item, i) in items">
          <v-layout v-if="item.heading" :key="i" row align-center>
            <v-flex xs6>
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
              <v-btn small text>edit</v-btn>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
          ></v-divider>
          <v-list-item v-else :key="i" router :to="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">{{
                item.text
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout id="maincontent" justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import NewsFeed from './components/NewsFeed.vue';
import BoardFilters from './components/BoardFilters.vue';
import KanbanDetail from './components/KanbanDetail.vue';

// import { isLoggedIn, login, logout } from './utils/auth';
import authService from './auth/authService';

export default Vue.extend({
  name: 'Inspire',

  components: {
    NewsFeed,
    BoardFilters,
    KanbanDetail,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: false,
    mini: true,
    dialog: false,
    newItemComponentKey: 0,
    isLoggedIn: null,
    currentGroup: localStorage.getItem('catkin:current_org'),

    items: [
      { icon: 'dashboard', text: 'Boards', route: '/' },
      // { icon: 'category', text: 'Epics', route: '/epics' },
      // { icon: "lightbulb", text: "Ideas lab" },
      { icon: 'perm_contact_calendar', text: 'Personas', route: '/personas' },
      { icon: 'group_work', text: 'Orgs', route: '/orgs' },

      // { divider: true },
      { icon: 'settings', text: 'Settings' },
    ],
  }),
  created() {
    this.isLoggedIn = this.getIsLoggedIn();
  },
  updated() {
    this.isLoggedIn = this.getIsLoggedIn();
  },
  methods: {
    forceRerender() {
      this.newItemComponentKey += 1;
    },
    async handleLogin() {
      authService.login();
      this.isLoggedIn = this.getIsLoggedIn();
    },
    handleLogout() {
      authService.logout();
      this.isLoggedIn = this.getIsLoggedIn();
    },
    getIsLoggedIn() {
      return authService.isLoggedIn();
    },
  },
});
</script>

<style lang="scss">
#keep .v-navigation-drawer__border {
  display: none;
}
</style>
