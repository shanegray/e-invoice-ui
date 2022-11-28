import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import HomePage from '@/views/home-page.vue';
import TestPage from '@/views/test-page.vue';
import SettingsPage from '@/views/settings-invoice-page.vue';
import LoginPage from '@/views/login-page.vue';
import AppSettings from '@/views/settings-app-page.vue';

import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    beforeEnter: authGuard
  },
  {
    path: '/test',
    component: TestPage,
    beforeEnter: authGuard
  },
  {
    path: '/invoicesettings',
    component: SettingsPage,
    beforeEnter: authGuard
  },
  {
    path: '/appsettings',
    component: AppSettings,
    beforeEnter: authGuard
  },

  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
