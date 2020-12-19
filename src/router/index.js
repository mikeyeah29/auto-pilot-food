import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingLists from '../views/ShoppingLists.vue'
import ShoppingList from '../views/ShoppingList.vue'
import ShoppingListEdit from '../views/ShoppingListEdit.vue'
import StockItems from '../views/StockItems.vue'
import Groceries from '../views/Groceries.vue'
import Meals from '../views/Meals/Index.vue'
import CreateList from '../views/CreateList.vue'
import CreateFromStock from '../views/CreateFromStock.vue'
import Login from '../views/Login.vue'

import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      allowAnonymous: true,
      loggedOut: true
    }
  },
  {
    path: '/groceries',
    name: 'Groceries',
    component: Groceries,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/meals',
    name: 'Meals',
    component: Meals,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/stock',
    name: 'StockItems',
    component: StockItems,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/lists',
    name: 'ShoppingLists',
    component: ShoppingLists,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/lists/show/:id',
    name: 'ShoppingList',
    component: ShoppingList,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/lists/edit/:id',
    name: 'ShoppingListEdit',
    component: ShoppingListEdit,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/lists/create',
    name: 'CreateList',
    component: CreateList,
    meta: {
      allowAnonymous: false
    }
  },
  {
    path: '/lists/create-from-stock',
    name: 'CreateFromStock',
    component: CreateFromStock,
    meta: {
      allowAnonymous: false
    }
  },
  // {
  //   path: '/',
  //   component: Dashboard,
  //   meta: {
  //     allowAnonymous: false
  //   }
  // },
  // {
  //   path: '/cashflow',
  //   component: CashFlow,
  //   meta: {
  //     allowAnonymous: false
  //   }
  // },
  // {
  //   path: '/budgets',
  //   component: Budgets,
  //   meta: {
  //     allowAnonymous: false
  //   }
  // },
  // {
  //   path: '/debts',
  //   component: Debts,
  //   meta: {
  //     allowAnonymous: false
  //   }
  // },
  // {
  //   path: '/login',
  //   component: Login,
  //   meta: {
  //     allowAnonymous: true,
  //     loggedOut: true
  //   }
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {

  store.commit('setError', null);
  store.commit('setSuccess', '');

  if(to.meta.loggedOut && store.getters.isLoggedIn) {
    next({
      path: '/',
      query: { redirect: to.fullPath }
    });
  }
  // not allowed for anyone && user isnt logged in
  if (!to.meta.allowAnonymous && !store.getters.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }
  else {
    next();
  }  
});

export default router
