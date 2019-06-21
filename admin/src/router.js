import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import CategoryEdit from './components/categoryEdit.vue'
import CategoryLists from './components/categoryLists.vue'
import itemsCreate from './components/ItemsCreate.vue'
import itemsLists from './components/ItemsLists.vue'
import herosCreate from './components/heroCreate.vue'
import herosLists from './components/heroLists.vue'
import articleCreate from './components/articleCreate.vue'
import articleLists from './components/articleLists.vue'


Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      children: [
        {
          path: '/categories/create',
          name: 'categories-create',
          component: CategoryEdit
        },
        {
          path: '/categories/lists',
          name: 'categories-lists',
          component: CategoryLists
        },
        {
          path: '/categories/create/:id',
          name: 'categories-edit',
          component: CategoryEdit,
          props: true
        },
        {
          path: '/items/create',
          name: 'items-create',
          component: itemsCreate
        },
        {
          path: '/items/lists',
          name: 'items-lists',
          component: itemsLists
        },
        {
          path: '/items/create/:id',
          name: 'items-edit',
          component: itemsCreate,
          props: true
        },
        {
          path: '/heros/create',
          name: 'heros-create',
          component: herosCreate,
        },
        {
          path: '/heros/lists',
          name: 'heros-lists',
          component: herosLists
        },
        {
          path: '/heros/create/:id',
          name: 'heros-edit',
          component: herosCreate,
          props: true
        },
        {
          path: '/articles/create',
          name: 'articles-create',
          component: articleCreate,
        },
        {
          path: '/articles/lists',
          name: 'articles-lists',
          component: articleLists
        },
        {
          path: '/articles/create/:id',
          name: 'articles-edit',
          component: articleCreate,
          props: true
        }
      ]
    }

  ]
})
