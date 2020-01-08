<template>
  <v-row dense>
    <v-col v-for="(persona, i) in personas" :key="i">
      <v-card
        cols="4"
        max-width="400"
        class="mx-auto"
        @click.stop="
          id = persona.id;
          dialog = true;
        "
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="persona.name"></v-card-title>

            <v-card-subtitle v-text="persona.role"></v-card-subtitle>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <PersonaDetail v-bind:id="id" v-on:persona-deleted="dialog = false" />
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script lang="ts">
// import faker from "faker";
import Vue from 'vue';

import { debounce } from 'lodash';
import gql from 'graphql-tag';
import PersonaDetail from './PersonaDetail.vue';

export default Vue.extend({
  data() {
    return {
      dialog: false,
      personas: [],
      items: [],
      id: null,
    };
  },
  apollo: {
    personas: {
      query: gql`
        query getPersonas {
          personas {
            name
            role
            id
          }
        }
      `,

      /// subscribe to updated and created item update

      // subscribeToMore: [
      //   {
      //     document: gql`
      //       subscription subItems {
      //         itemCreatedOrUpdated {
      //           id
      //           title
      //           estimate
      //           status
      //           description
      //         }
      //       }
      //     `,
      //     // Variables passed to the subscription. Since we're using a function,
      //     // they are reactive
      //     variables() {
      //       return {
      //         // param: this.param,
      //       };
      //     },
      //     // Mutate the previous result
      //     updateQuery: (previousResult, { subscriptionData }) => {
      //       // Here, return the new result from the previous with the new data
      //       if (
      //         previousResult.items.find(
      //           item =>
      //             item.id === subscriptionData.data.itemCreatedOrUpdated.id,
      //         )
      //       ) {
      //         return previousResult;
      //       }
      //       return {
      //         items: [
      //           ...previousResult.items,
      //           subscriptionData.data.itemCreatedOrUpdated,
      //         ],
      //       };
      //     },
      //   },
      //   // deleted items subscription
      //   {
      //     document: gql`
      //       subscription delItems {
      //         itemDeleted {
      //           id
      //           title
      //           estimate
      //           status
      //           description
      //         }
      //       }
      //     `,

      //     variables() {
      //       return {
      //         // param: this.param,
      //       };
      //     },

      //     updateQuery: (previousResult, { subscriptionData }) => {
      //       return {
      //         items: previousResult.items.filter(
      //           item => item.id !== subscriptionData.data.itemDeleted.id,
      //         ),
      //       };
      //     },
      //   },
      // ],
    },
  },
  components: {
    PersonaDetail,
  },
  mounted() {},

  methods: {},
});
</script>

<style></style>
