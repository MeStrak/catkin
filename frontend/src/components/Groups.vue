<template>
  <v-row dense>
    <v-col v-for="(group, i) in groups" :key="i">
      <v-card
        cols="4"
        max-width="400"
        class="mx-auto"
        @click.stop="
          id = group.id;
          dialog = true;
        "
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="group.name"></v-card-title>

            <v-card-subtitle v-text="group.description"></v-card-subtitle>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img></v-img>
          </v-avatar>
        </div>
         <v-btn
        color="#5DA2D5"
        dark
         @click.stop="setCurrentGroup(group.id);"
      ><v-icon>open_in_new</v-icon> 
      </v-btn>
      </v-card>
      
    </v-col>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <GroupDetail v-bind:id="id" v-on:group-deleted="dialog = false" />
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script lang="ts">
import Vue from 'vue';

import { debounce } from 'lodash';
import gql from 'graphql-tag';
import GroupDetail from './GroupDetail.vue';

export default Vue.extend({
  data() {
    return {
      dialog: false,
      groups: [],
      items: [],
      id: null,
    };
  },
  apollo: {
    groups: {
      query: gql`
        query getGroups {
          groups {
            name
            description
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
    GroupDetail,
  },
  mounted() {},

  methods: {
setCurrentGroup(groupId: string)
{
      localStorage.setItem('catkin:current_org', groupId);
      this.$router.push('/');
},

  },
});
</script>

<style></style>
