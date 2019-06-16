import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import CategoryEdit from './components/categoryEdit.vue'
import CategoryLists from './components/categoryLists.vue'



Vue.use(Router)




export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      children:[
        {
          path:'/category/create',
          name:'category-create',
          component:CategoryEdit
        },
        {
          path:'/category/lists',
          name:'category-lists',
          component:CategoryLists
        }
      ]
    }
 
  ]
})
