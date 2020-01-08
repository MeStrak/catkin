import Vue from 'vue';
import Router from 'vue-router';
import { authGuard } from './auth';

import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // component: Home
      component: () =>
        import(/* webpackChunkName: "about" */ './components/KanbanView.vue'),
      // beforeEnter: authGuard,
    },
    {
      path: '/landing',
      name: 'landing',
      // component: Home
      component: () =>
        import(/* webpackChunkName: "about" */ './components/Landing.vue'),
      // beforeEnter: authGuard,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/personas',
      name: 'personas',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './components/Personas.vue'),
    },
    {
      path: '/callback',
      name: 'callback',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './components/Callback.vue'),
    },
    {
      path: '/epics',
      name: 'epics',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './components/Epics.vue'),
    },
  ],
});

import authService from './auth/authService';

//always forward to landing page if user isn't authenticated
router.beforeEach((to, from, next) => {
  if (to.path === '/landing') next();
  else if (to.path === '/callback') next();
  else if (!authService.isLoggedIn()) next('/landing');
  else next();
});

export default router;
