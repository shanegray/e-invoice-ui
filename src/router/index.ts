import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

import HomePage from '@/views/home-page.vue';
import TestPage from '@/views/test-page.vue';
import SettingsPage from '@/views/settings-invoice-page.vue';
import ExamplePage from '@/views/exampl-page.vue';
import AppSettings from '@/views/settings-app-page.vue';


Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/test',
    component: TestPage
  },
  {
    path: '/invoicesettings',
    component: SettingsPage
  },
  {
    path: '/appsettings',
    component: AppSettings
  },
  {
    path: '/example',
    component: ExamplePage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
