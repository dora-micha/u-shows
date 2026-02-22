import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ShowDetailView from '../views/ShowDetailView.vue'

export enum RouteName {
  Dashboard = 'dashboard',
  ShowDetail = 'showDetail'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: RouteName.Dashboard,
      component: DashboardView
    },
    {
      path: '/show/:id',
      name: RouteName.ShowDetail,
      component: ShowDetailView
    }
  ]
})

export default router
