import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import CategoryEdit from './components/categoryEdit.vue'
import CategoryLists from './components/categoryLists.vue'
import ItemsCreate from './components/ItemsCreate.vue'
import ItemsLists from './components/ItemsLists.vue'
import HerosCreate from './components/heroCreate.vue'
import HerosLists from './components/heroLists.vue'
import ArticleCreate from './components/articleCreate.vue'
import ArticleLists from './components/articleLists.vue'
import AdsCreate from './components/adsCreate.vue'
import AdsLists from './components/adsLists.vue'
import Admin_userCreate from './components/admin_userCreate.vue'
import Admin_userLists from './components/admin_userLists.vue'
import Login from './views/login.vue'


Vue.use(Router)



const router= new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component:Login,
      meta: { isPublic: true }
    },
    {
      path: '/',
      name: 'home',
      component: Index,
      children: [
        {
          path: 'categories/create',
          name: 'categories-create',
          component: CategoryEdit
        },
        {
          path: 'categories/lists',
          name: 'categories-lists',
          component: CategoryLists
        },
        {
          path: 'categories/create/:id',
          name: 'categories-edit',
          component: CategoryEdit,
          props: true
        },
        {
          path: 'items/create',
          name: 'items-create',
          component: ItemsCreate
        },
        {
          path: 'items/lists',
          name: 'items-lists',
          component: ItemsLists
        },
        {
          path: 'items/create/:id',
          name: 'items-edit',
          component: ItemsCreate,
          props: true
        },
        {
          path: 'heros/create',
          name: 'heros-create',
          component: HerosCreate,
        },
        {
          path: 'heros/lists',
          name: 'heros-lists',
          component: HerosLists
        },
        {
          path: 'heros/create/:id',
          name: 'heros-edit',
          component: HerosCreate,
          props: true
        },
        {
          path: 'articles/create',
          name: 'articles-create',
          component: ArticleCreate,
        },
        {
          path: 'articles/lists',
          name: 'articles-lists',
          component: ArticleLists
        },
        {
          path: 'articles/create/:id',
          name: 'articles-edit',
          component: ArticleCreate,
          props: true
        },
        {
          path: 'ads/create',
          name: 'ads-create',
          component: AdsCreate,
        },
        {
          path: 'ads/lists',
          name: 'ads-lists',
          component: AdsLists
        },
        {
          path: 'ads/create/:id',
          name: 'ads-edit',
          component: AdsCreate,
          props: true
        },
        {
          path: 'admin_users/create',
          name: 'admin_users-create',
          component: Admin_userCreate,
        },
        {
          path: 'admin_users/lists',
          name: 'admin_users-lists',
          component: Admin_userLists
        },
        {
          path: 'admin_users/create/:id',
          name: 'admin_users-edit',
          component: Admin_userCreate,
          props: true
        }

      ]
    }

  ]
})

router.beforeEach((to, from ,next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router

