import {createRouter, createWebHistory} from 'vue-router'
import Result from '@/views/Result'
import Upload from "@/views/Upload";

const routes = [
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/',
    name: 'Upload',
    component: Upload
  },
  {
    path: '/check',
    name: 'Check',
    component: () => import('@/views/Check')
  }, {
    path: '/error',
    name: 'Error',
    component: () => import('@/views/Error')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
