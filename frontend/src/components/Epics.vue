<template>
  <!-- <v-container fluid grid-list-md> -->
  <v-img
    dark
    src="https://images.unsplash.com/photo-1559567951-34c59e05c08c"
    fluid
    grid-list-md
  >
    <kanban-board
      :stages="statuses"
      :blocks="blocks"
      @update-block="updateBlock"
    >
      <div v-for="stage in statuses" :slot="stage" :key="stage">
        <h2>
          {{ stage }}
          <a>+</a>
        </h2>

        <v-progress-linear
          v-model="epicProgress"
          color="deep-purple accent-4"
        ></v-progress-linear>
      </div>
      <v-card
        v-for="item in blocks"
        :slot="item.id"
        :key="item.id"
        class="mx-auto"
        max-width="344"
        @click.stop="dialog = true"
      >
        <v-card-title class="align-end fill-height">{{
          item.title
        }}</v-card-title>
        <v-card-text>
          id:
          {{ item.id }}
        </v-card-text>
      </v-card>
      <div v-for="stage in statuses" :key="stage" :slot="`footer-${stage}`">
      </div>
    </kanban-board>
    <v-dialog v-model="dialog" max-width="80%">
      <v-card>
        <KanbanDetail />
      </v-card>
    </v-dialog>
  </v-img>
</template>

<script lang="ts">
import Vue from 'vue';

import { debounce } from 'lodash';
import vueKanban from 'vue-kanban';
import KanbanDetail from './KanbanDetail.vue';
Vue.use(vueKanban);

export default Vue.extend({
  data() {
    return {
      statuses: ['Epic 1', 'Epic 2', 'Epic 3', 'Epic 4', 'Epic 5', 'Epci 6'],
      blocks: [],
      dialog: false,
      epicProgress: 60,
    };
  },
  components: {
    KanbanDetail,
  },
  mounted() {
  },

  methods: {
    updateBlock: debounce(function(id, status) {
      this.blocks.find(b => b.id === Number(id)).status = status;
    }, 500),
  },
});
</script>

<style lang="scss">
@import '../assets/kanban.scss';

.container {
  padding: 0px;
}
</style>
