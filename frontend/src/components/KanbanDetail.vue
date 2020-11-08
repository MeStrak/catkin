<template>
  <v-card>
    <v-container fluid pa-3 scrollable wrap>
      <!-- <v-toolbar flat color="pink" dark>
      <v-toolbar-title>Thing editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>send</v-icon>
      </v-toolbar>-->
      <v-row>
        <v-col>
          <v-text-field
            label="Title"
            v-model="itemById.title"
            class="headline"
            hide-details
            @blur="updateItem()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="9" class="order-2 order-md-1">
          <p class="headline">Description</p>
          <editor
            ref="tuiEditor"
            previewStyle="vertical"
            height="750px"
            initialEditType="wysiwyg"
            @blur="onEditorBlur"
          />
        </v-col>
        <v-col cols="12" md="3" class="order-1 order-md-2">
          <v-btn small color="error" @click.prevent="deleteItem">Delete</v-btn>
          <v-autocomplete
            v-model="itemById.personas"
            :items="personas"
            item-text="name"
            item-value="id"
            @blur="updateItem()"
            chips
            deletable-chips
            label="Personas"
            x-large
            hide-details
            hide-no-data
            hide-selected
            multiple
          ></v-autocomplete>
          <v-select
            v-model="itemById.estimate"
            :items="estimateOptions"
            label="Estimate"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/vue-editor';

export default Vue.extend({
  name: 'KanbanDetail',
  components: {
    editor: Editor,
  },
  data() {
    return {
      hello: '',
      personas: '',
      itemById: '',
      selectedpersonaids: [],
      estimateOptions: [1, 2, 3, 5, 8, 13, 21],
      skipQuery: true,
      currentItemId: this.id,
    };
  },
  created() {
    // if this is a new item, create a record in the database so that bindings work
    if (this.id === 'newitem') {
      console.log('newitem');
      this.skipQuery = true;
      this.createNewItem();
      this.currentItemId = this.id;
    } else {
      this.currentItemId = this.id;
      this.skipQuery = false;
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {
    this.$refs.tuiEditor.invoke('setMarkdown', this.itemById.description);
  },
  beforeDestroy() {},
  destroyed() {},
  apollo: {
    personas: gql`
      query {
        personas {
          name
          id
        }
      }
    `,
    itemById: {
      // gql query
      query: gql`
        query itemById($itemid: String!) {
          itemById(id: $itemid) {
            title
            status
            estimate
            description
            personas
            group
          }
        }
      `,
      // Static parameters
      variables() {
        return {
          itemid: this.currentItemId,
        };
      },
      // Disable the query when waiting for a new item id
      skip() {
        return this.currentItemId === 'newitem';
      },
    },
  },
  props: {
    id: String,
  },
  methods: {
    deleteItem() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: String!) {
              deleteItem(id: $id) {
                id
              }
            }
          `,
          // Parameters
          variables: {
            id: this.currentItemId,
          },
        })
        .then((data) => {
          // Result
          this.$emit('item-deleted');
        })
        .catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
        });
    },
    updateItem() {
      // We save the user input in case of an error

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
                title
                status
                estimate
                description
                personas
                group
              }
            }
          `,
          // Parameters
          variables: {
            id: this.currentItemId,
            title: this.itemById.title,
            estimate: this.itemById.estimate,
            description: this.itemById.description,
            status: this.itemById.status,
            personas: this.itemById.personas,
            group: this.itemById.group,
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
        .then((data) => {
          // Result
        })
        .catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
        });
    },
    createNewItem() {
      console.log('createnewitem');
      console.log(localStorage.getItem('catkin:current_group'));
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $title: String!
              $status: String
              $estimate: Int!
              $description: String!
              $personas: [String!]!
              $group: String!
            ) {
              createItem(
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
                title
                status
                estimate
                description
                personas
                group
              }
            }
          `,
          // Parameters
          variables: {
            title: '',
            estimate: 0,
            description: '',
            status: 'incubator',
            personas: [],
            group: localStorage.getItem('catkin:current_group'),
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
        .then((data) => {
          // Result
          console.log('generated new id:' + data.data.createItem.id);
          this.currentItemId = data.data.createItem.id;
          this.itemById = data.data.createItem;
          this.skipQuery = false;
        })
        .catch((error) => {
          // Error
          console.log('fart');

          console.error(error);
          console.log('fart');
          // We restore the initial user input
        });
    },
    onEditorBlur() {
      console.log('onEditorBlur');
      this.itemById.description = this.$refs.tuiEditor.invoke('getMarkdown');

      console.log(this.itemById.id);
      this.updateItem();
    },
  },
});
</script>

<style></style>
