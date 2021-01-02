<template>
  <v-card>
    <v-container fluid pa-3>
      <v-form no-gutters>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="groupById.name"
              class="headline"
              hide-details
              @blur="updateGroup()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              label="description"
              v-model="groupById.description"
              class="headline"
              hide-details
              @blur="updateGroup()"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import gql from 'graphql-tag';

export default Vue.extend({
  name: 'GroupDetail',
  components: {},
  data() {
    return {
      groupById: '',
      currentGroupId: this.id,
      thisID: this.id,
    };
  },
  created() {
    // if this is a new item, create a record in the database so that bindings work
    if (this.id === 'newgroup') {
      console.log('new group');
      this.createNewGroup();
    }
    else {
      console.log('existing group')
    }
    this.currentGroupId = this.id;

  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  apollo: {
    groups: gql`
      query {
        groups {
          name
          id
        }
      }
    `,
    groupById: {
      // gql query
      query: gql`
        query groupById($groupid: String!) {
          groupById(id: $groupid) {
            name
            description
          }
        }
      `,
      // Static parameters
      variables() {
        return {
          groupid: this.id,
        };
      },
      skip() {
        return this.currentGroupId === 'newgroup';
      },
    },
  },
  props: {
    id: String,
  },
  methods: {
    deleteGroup() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: String!) {
              deleteGroup(id: $id) {
                id
              }
            }
          `,
          // Parameters
          variables: {
            id: this.id,
          },
        })
        .then((data) => {
          // Result
          this.$emit('group-deleted');
        })
        .catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
        });
    },
    updateGroup() {
      // We save the user input in case of an error

      // Call to the graphql mutation
      // TODO: update one at a time
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: String!, $name: String!, $description: String) {
              updateGroup(
                id: $id
                input: { name: $name, description: $description }
              ) {
                id
                name
                description
              }
            }
          `,
          // Parameters
          variables: {
            id: this.id,
            name: this.groupById.name,
            description: this.groupById.description,
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
    createNewGroup() {
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation(
              $name: String!
              $security: String!
              ) {
              createGroup(
                input: {
                  name: $name
                  security: $security
                   }
                ) {
                id
                name
                security
                description
              }
            }
          `,
          // Parameters
          variables: {
            name: '',
            description: '',
            security: 'PRIVATE'
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

          this.thisId = data.data.createGroup.id;
          this.groupById = data.data.createGroup;
        })
        .catch((error) => {
          // Error
          console.error(error);
          // We restore the initial user input
        });
    },
  },
});
</script>

<style></style>
