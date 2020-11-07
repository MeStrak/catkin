<template>
  <v-card>
    <v-container fluid pa-3>
      <!-- <v-toolbar flat color="pink" dark>
      <v-toolbar-title>Thing editor</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-icon>send</v-icon>
      </v-toolbar>-->
      <v-form no-gutters>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="personaById.name"
              class="headline"
              hide-details
              @blur="updatePersona()"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Role"
              v-model="personaById.role"
              class="headline"
              hide-details
              @blur="updatePersona()"
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
  name: 'PersonaDetail',
  components: {},
  data() {
    return {
      personaById: '',
      thisID: this.id,
    };
  },
  created() {
    // if this is a new item, create a record in the database so that bindings work
    if (this.id === 'newPersona') {
      this.createNewPersona();
    }
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
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
    personaById: {
      // gql query
      query: gql`
        query personaById($personaid: String!) {
          personaById(id: $personaid) {
            name
            role
          }
        }
      `,
      // Static parameters
      variables() {
        return {
          personaid: this.id,
        };
      },
    },
  },
  props: {
    id: String,
  },
  methods: {
    deletePersona() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: String!) {
              deletePersona(id: $id) {
                id
              }
            }
          `,
          // Parameters
          variables: {
            id: this.id,
          },
        })
        .then(data => {
          // Result
          this.$emit('persona-deleted');
        })
        .catch(error => {
          // Error
          console.error(error);
          // We restore the initial user input
        });
    },
    updatePersona() {
      // We save the user input in case of an error

      // Call to the graphql mutation
      // TODO: update one at a time
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($id: String!, $name: String!, $role: String) {
              updatePersona(id: $id, input: { name: $name, role: $role }) {
                id
                name
                role
              }
            }
          `,
          // Parameters
          variables: {
            id: this.id,
            name: this.personaById.name,
            role: this.personaById.role,
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
        });
    },
    createNewPersona() {
      // Call to the graphql mutation
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($name: String!) {
              createPersona(input: { name: $name }) {
                id
                name
                role
              }
            }
          `,
          // Parameters
          variables: {
            name: '',
            role: '',
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

          this.thisId = data.data.createPersona.id;
          this.personaById = data.data.createPersona;
        })
        .catch(error => {
          // Error
          console.error(error);
          // We restore the initial user input
        });
    },
  },
});
</script>

<style></style>
