<template>
  <!-- <v-container> -->
  <v-img
    :src="require('../assets/boxcat.jpg')"
    cover
    gradient="to top right, rgb(100,100,100,.6), rgba(100,100,100,.6)"
    fluid
    grid-list-md
    style="height: calc(100vh - 64px)"
  >
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/catkinlogonobgwhite.svg')"
          contain
          class="my-3"
          height="150"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-3 font-weight-bold mb-5" style="color: white">
          Welcome to catkin
        </h1>
        <h1 class="display-1 mb-5" style="color: white">
          Open source agile workflow.
        </h1>
        <p>
          <span style="color: white">
            Disclaimer: Catkin is not production ready. Do not use it for
            storing private or sensitive data.</span
          >
        </p>
      </v-flex>

      <!-- <v-flex mb-5 xs12>
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >{{ next.text }}</a>
        </v-layout>
      </v-flex>

      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >{{ link.text }}</a>
        </v-layout>
      </v-flex>-->
    </v-layout>
  </v-img>
  <!--</v-container>-->
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader',
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify',
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify',
      },
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com',
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com',
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify',
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs',
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify',
      },
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer',
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/layout/pre-defined',
      },
      {
        text: 'Frequently Asked Questions',
        href:
          'https://vuetifyjs.com/getting-started/frequently-asked-questions',
      },
    ],
  }),
});
</script>

<style lang="scss">
.container {
  padding: 0px;
  word-break: break-word;
}
</style>
