import { createRouter, createWebHistory } from 'vue-router'
import AccueilView from '../views/AccueilView.vue'
import FilmsView from '../views/FilmsView.vue'
import SeriesView from '../views/SeriesView.vue'
import MangasView from '../views/MangasView.vue'
import KidsView from '../views/KidsView.vue'
import ListeView from '../views/pays/ListeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/',          name: 'AccueilView',      component: AccueilView    },
    { path: '/films',     name: 'FilmsView',     component: FilmsView},
    { path: '/series',     name: 'SeriesView',     component: SeriesView },
    { path: '/mangas',     name: 'MangasView',     component: MangasView },
    { path: '/kids',     name: 'KidsView',     component: KidsView },
    { path: '/pays',     name: 'ListeView',     component: ListeView },
  ]
})

export default router
