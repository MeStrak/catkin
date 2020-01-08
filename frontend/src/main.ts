import App from './App.vue';
import Vue from 'vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import vuetify from './plugins/vuetify';

import VueApollo from 'vue-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// New Imports
import { ApolloLink, concat, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { Auth0Plugin } from './auth';
import authService from './auth/authService';

// import { createProvider } from './vue-apollo.js';

// Vue.use(Auth0Plugin, {
//   domain: process.env.VUE_APP_AUTH0_DOMAIN,
//   clientid: process.env.VUE_APP_AUTH0_CLIENT_ID,
//   onRedirectCallback: appState => {
//     router.push(
//       appState && appState.targetUrl
//         ? appState.targetUrl
//         : window.location.pathname,
//     );
//   },
// });

// import ApolloClient from 'apollo-boost'
// console.log(process.env.VUE_APP_GRAPHQL_HTTP);
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: process.env.VUE_APP_GRAPHQL_HTTP,
  //uri: 'http://localhost:3000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('gqlbear'); //Vue.prototype.$auth.gqlbearer || null;
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${token}` || null,
    },
  });
  return forward(operation);
});

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: process.env.VUE_APP_GRAPHQL_WS,
  //uri: 'ws://localhost:3000/graphql',

  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, link),
  //link: link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Install the vue plugin like before
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
