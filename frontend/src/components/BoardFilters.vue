<template>
  <v-card>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Current sprint</v-list-item-title>
          <v-list-item-subtitle
            >Only show things from the current sprint</v-list-item-subtitle
          >
        </v-list-item-content>

        <v-list-item-action>
          <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Incubator</v-list-item-title>
          <v-list-item-subtitle
            >Incubator and not started items</v-list-item-subtitle
          >
        </v-list-item-content>

        <v-list-item-action>
          <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>History</v-list-item-title>
          <v-list-item-subtitle>Everything that's done</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
            <v-icon>favorite</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="message" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Project 1</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="hints" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Project 2</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="hints" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Project 3</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="message" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Label 1</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="hints" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Label 2</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch v-model="hints" color="purple"></v-switch>
        </v-list-item-action>
        <v-list-item-title>Label 3</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="menu = false">Cancel</v-btn>
      <v-btn color="primary" text @click="menu = false">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'BoardFilters',
  data: () => ({
    items: [
      { header: 'Today' },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        title: 'Brunch this weekend?',
        subtitle:
          "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle:
          "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        title: 'Oui oui',
        subtitle:
          "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        title: 'Birthday gift',
        subtitle:
          "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
      },
      { divider: true, inset: true },
      {
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        title: 'Recipe to try',
        subtitle:
          "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
    ],
  }),
});
</script>

<style></style>
