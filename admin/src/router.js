import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import CategoryEdit from './components/categoryEdit.vue'
import CategoryLists from './components/categoryLists.vue'
import itemsCreate from './components/ItemsCreate.vue'
import itemsLists from './components/ItemsLists.vue'


Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      children:[
        {
          path:'/categories/create',
          name:'categories-create',
          component:CategoryEdit
        },
        {
          path:'/categories/lists',
          name:'categories-lists',
          component:CategoryLists
        },
        {
          path:'/categories/create/:id',
          name:'categories-create',
          component:CategoryEdit,
          props:true
        },
        {
          path:'/items/create',
          name:'items-create',
          component:itemsCreate
        },
        {
          path:'/items/lists',
          name:'items-lists',
          component:itemsLists
        },
        {
          path:'/items/create/:id',
          name:'items-create',
          component:itemsCreate,
          props:true
        }
      ]
    }
 
  ]
})
