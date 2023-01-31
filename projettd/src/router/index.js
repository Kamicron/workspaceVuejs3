import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Td01View from '../views/Td01View.vue'
import Tp01View from '../views/Tp01View.vue'
import Td02View from '../views/Td02View.vue'
import Tp02View from '../views/Tp02View.vue'
import Td03View from '../views/Td03View.vue'
import Td04View from '../views/Td04View.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',      name: 'homeView',      component: HomeView },
    { path: '/td01',      name: 'Td01View',      component: Td01View },
    { path: '/tp01',      name: 'Tp01View',      component: Tp01View },
    { path: '/td02',      name: 'Td02View',      component: Td02View },
    { path: '/tp02',      name: 'Tp02View',      component: Tp02View },
    { path: '/td03',      name: 'Td03View',      component: Td03View },
    { path: '/td04',      name: 'Td04View',      component: Td04View },

  ]
})

export default router
