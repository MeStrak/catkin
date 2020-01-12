// <template><em></em></template>
// <script>
// import { setIdToken, setAccessToken } from '../utils/auth';
// export default {
//   name: '',
//   mounted() {
//     this.$nextTick(() => {
//       setAccessToken();
//       setIdToken();
//       window.location.href = '/';
//     });
//   },
// };
//
</script>

<template>
  <div>Loading ...</div>
</template>

<script>
import eventBus from '../auth/event-bus';
import authService from '../auth/authService';
export default {
  name: 'callback',
  methods: {
    handleLogin() {
      this.$router.push('/');
    },
  },
  created() {
    authService.handleAuthentication();
    eventBus.$on('login', () => this.handleLogin());
  },
};
</script>

<style scoped></style>