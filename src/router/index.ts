import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ShowDetailView from '../views/ShowDetailView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export enum RouteName {
  Dashboard = 'dashboard',
  ShowDetail = 'showDetail',
  NotFound = 'notFound'
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: RouteName.NotFound,
      component: NotFoundView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // If navigating with hash, scroll to that element
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 20
      }
    }

    // If going to show detail page, always scroll to top
    if (to.name === RouteName.ShowDetail) {
      return { top: 0 }
    }

    // For back/forward navigation, preserve scroll position (KeepAlive)
    if (savedPosition) {
      return savedPosition
    }

    // Default: maintain current scroll position
    return false
  }
})

export default router
