import Vue from 'vue'
import Router from 'vue-router'
import detail from '@/views/detail'
import library from '@/views/library'

Vue.use(Router)

var routes = [
  {
    path: '/',
    name: 'library',
    component: library,
    meta: {keepAlive: true},
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail,
    meta: {keepAlive: false},
  }
];
export default new Router({
  routes, scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
