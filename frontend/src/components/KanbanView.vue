<template>
  <!-- <v-container fluid grid-list-md> -->
  <v-img
    src="https://images.unsplash.com/photo-1568509137935-ba0c7848f947"
    fluid
    grid-list-md
    style="height: calc(100vh - 64px)"
  >
    <kanban-board
      :stages="statuses"
      :blocks="items"
      @update-block="updateBlock"
    >
      <div v-for="stage in statuses" :slot="stage" :key="stage">
        <h2>
          {{ stage }}
          <a>+</a>
        </h2>
      </div>
      <!-- <div v-for="item in blocks" :slot="item.id" :key="item.id"> -->
      <v-card
        v-for="item in items"
        :slot="item.id"
        :key="item.id"
        class="mx-auto"
        max-width="344"
        @click.stop="
          id = item.id;
          dialog = true;
        "
      >
        <v-card-title class="align-end fill-height">
          {{ item.title }}
        </v-card-title>
        <v-card-text>
          #123
          <!-- {{ item.id }} -->
        </v-card-text>
      </v-card>
      <!-- </div> -->
      <div v-for="stage in statuses" :key="stage" :slot="`footer-${stage}`">
      </div>
    </kanban-board>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <KanbanDetail v-bind:id="id" v-on:item-deleted="dialog = false" :key="id" />
      </v-card>
    </v-dialog>
  </v-img>
  <!-- </v-container> -->
</template>

<script lang="ts">
// import faker from "faker";
import Vue from 'vue';

import { debounce } from 'lodash';
import vueKanban from 'vue-kanban';
import KanbanDetail from './KanbanDetail.vue';
import gql from 'graphql-tag';

Vue.use(vueKanban);

export default Vue.extend({
  data() {
    return {
      statuses: ['incubator', 'review', 'ready', 'in progress', 'done'],
      blocks: [],
      dialog: false,
      items: [],
      id: null,
    };
  },
  apollo: {
    items: {
      query: gql`
        query getItems($groupid: String!) {
          items(group: $groupid) {
            title
            estimate
            status
            description
            id
            group
          }
        }
      `,
      variables() {
        return {
          groupid: localStorage.getItem('catkin:current_group'),
        };
      },

      /// subscribe to updated and created item update

      subscribeToMore: [
        {
          document: gql`
            subscription subItems($token: String!) {
              itemCreatedOrUpdated(token: $token) {
                id
                title
                estimate
                status
                description
                group
              }
            }
          `,
          // Variables passed to the subscription. Since we're using a function,
          // they are reactive
          variables() {
            return {
              token: 'Bearer ' + localStorage.getItem('gqlbear'),
              // param: this.param,
            };
          },
          // Mutate the previous result
          updateQuery: (previousResult, { subscriptionData }) => {
            // Here, return the new result from the previous with the new data
            if (
              previousResult.items.find(
                item =>
                  item.id === subscriptionData.data.itemCreatedOrUpdated.id,
              )
            ) {
              return previousResult;
            }
            return {
              items: [
                ...previousResult.items,
                subscriptionData.data.itemCreatedOrUpdated,
              ],
            };
          },
        },
        // deleted items subscription
        {
          document: gql`
            subscription delItems($token: String!) {
              itemDeleted(token: $token) {
                id
                title
                estimate
                status
                description
                group
              }
            }
          `,

          variables() {
            return {
              token: 'Bearer ' + localStorage.getItem('gqlbear'),

              // param: this.param,
            };
          },

          updateQuery: (previousResult, { subscriptionData }) => {
            return {
              items: previousResult.items.filter(
                item => item.id !== subscriptionData.data.itemDeleted.id,
              ),
            };
          },
        },
      ],
    },
  },
  components: {
    KanbanDetail,
  },
  mounted() {
    for (let i = 0; i <= this.items.length; i += 1) {
      this.blocks.push({
        id: this.items[i].id,
        status: 'review', // this.statuses[Math.floor(Math.random() * 6)],
        title: this.items[i].title,
      });
    }
  },

  methods: {
    updateBlock: debounce(function(id, status) {
      let blockToUpdate = this.items.find(b => b.id === id);
      blockToUpdate.status = status;
      this.updateItem(blockToUpdate);
    }, 500),
    addBlock: debounce(function(stage) {
      this.blocks.push({
        id: this.blocks.length,
        status: stage,
        title: 'fart', // faker.company.bs()
      });
    }, 500),
    updateItem(item) {
      // Call to the graphql mutation
      // TODO: update one at a time
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $id: String!
              $title: String!
              $status: String
              $estimate: Int!
              $description: String!
              $personas: [String!]!
              $group: String!
            ) {
              updateItem(
                id: $id
                input: {
                  title: $title
                  status: $status
                  estimate: $estimate
                  description: $description
                  personas: $personas
                  group: $group
                }
              ) {
                id
                status
              }
            }
          `,
          // Parameters
          variables: {
            id: item.id,
            title: item.title,
            estimate: item.estimate,
            description: item.description,
            status: item.status,
            personas: [],
            group: item.group,
          },
          // Update the cache with the result
          //
          // and then with the real result of the mutation
          // update: (store, { data: { addTag } }) => {
          //   // Read the data from our cache for this query. The query will be updated with the optimistic response
          //   const data = store.readQuery({ query: TAGS_QUERY });
          //   // Add our tag from the mutation to the end
          //   data.tags.push(addTag);
          //   // Write our data back to the cache.
          //   store.writeQuery({ query: TAGS_QUERY, data });
          // },
          // // Optimistic UI
          // // Will be treated as a 'fake' result as soon as the request is made
          // // so that the UI can react quickly and the user be happy
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   addTag: {
          //     __typename: 'Tag',
          //     id: -1,
          //     label: newTag,
          //   },
          // },
        })
        .then(data => {
          // Result
        })
        .catch(error => {
          // Error
          console.error(error);
          // We restore the initial user input
          // this.newTag = newTag;
        });
    },
  },
});
</script>

<style lang="scss">
@import '../assets/kanban.scss';

.container {
  padding: 0px;
  word-break: break-word;
}

.v-card__title {
  word-break: break-word;
}

::-webkit-scrollbar {
  width: 9px;
  height: 9px;
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 9px;
}

::-webkit-scrollbar-thumb {
  border-radius: 9px;
  -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
