import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { 
	faEdit,  
	faTrashAlt,
	faSignOutAlt,
	faReceipt,
	faShoppingBasket,
	faCarrot,
	faListOl,
	faUtensils,
	faShoppingBag,
	faStar,
	faCheck,
	faTimes
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css';

library.add(faEdit);
library.add(faTrashAlt);
library.add(faReceipt);
library.add(faShoppingBasket);
library.add(faCarrot);
library.add(faSignOutAlt);
library.add(faListOl);
library.add(faUtensils);
library.add(faShoppingBag);
library.add(faStar);
library.add(faCheck);
library.add(faTimes);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
