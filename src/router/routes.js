

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('pages/Home.vue')
  },
  {
    path: '/pipeline',
    name: 'pipelines',
    component: () => import('pages/Pipelines.vue')
  },
  {
    path: '/pipeline/new',
    name: 'new_pipeline',
    component: () => import('pages/Pipeline.vue')
  },
  {
    path: '/pipeline/:id',
    name: 'pipeline',
    component: () => import('pages/Pipeline.vue')
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  }
]

export default routes
