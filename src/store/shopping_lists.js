import axios from 'axios';
import router from "../router/index.js";

const state = {
	shopping_lists: []
};

const getters = {
	shoppingList(state) {
		return state.shopping_list;
	}
};

const mutations = {
	setShoppingLists(state, shopping_lists) {
		state.shopping_lists = shopping_lists;
	}
};

const actions = {
	getShoppingLists({state, rootState, commit}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(rootState.api_url + '/api/shopping-lists')
			.then((res) => {
				commit('setShoppingLists', res.data.shopping_lists);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	addShoppingList({state, rootState, commit}, data) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(rootState.api_url + '/api/shopping-lists', data)
			.then((res) => {
				console.log(res);
				router.push("/lists/show/" + res.data.listId);
				commit('setLoading', false);
			})
			.catch((e) => {
				commit('setError', e);
				commit('setLoading', false);
			});
	},
	getShoppingList({state, rootState, commit}, listId) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		return axios.get(rootState.api_url + '/api/shopping-lists/' + listId);
	},
	deleteShoppingList({state, rootState, commit}, listId) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.delete(rootState.api_url + '/api/shopping-lists/' + listId)
			.then((res) => {
				commit('setError', null);
				router.push("/lists");
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	addGroceryToShoppingList({state, rootState, commit}, data) {
		commit('setLoading', true);
		commit('setError', null);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		return axios.post(rootState.api_url + '/api/shopping-lists/' + data.shoppingListId + '/' + data.groceryId, {});
	},
	removeGroceryFromShoppingList({state, rootState, commit}, data) {
		commit('setLoading', true);
		commit('setError', null);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		return axios.delete(rootState.api_url + '/api/shopping-lists/' + data.shoppingListId + '/' + data.itemId);
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}