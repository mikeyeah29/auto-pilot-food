import axios from 'axios';

const state = {
	groceries: [],
	stock: []
};

const getters = {

}

const mutations = {
	setGroceries(state, groceries) {
		state.groceries = groceries;
	},
	setStockGroceries(state, groceries) {
		state.stock = groceries;
	}
}

const actions = {
	getGroceries({commit, rootState}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(rootState.api_url + '/api/groceries')
			.then((res) => {
				commit('setGroceries', res.data.groceries);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	getStockGroceries({commit, rootState}) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.get(rootState.api_url + '/api/groceries?status=default')
			.then((res) => {
				commit('setStockGroceries', res.data.groceries);
				commit('setLoading', false);
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	},
	addGrocery({commit, rootState, dispatch}, grocery) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(rootState.api_url + '/api/groceries', grocery)
			.then((res) => {
				commit('setError', null);
				dispatch('getGroceries');
			})
			.catch((e) => {
				commit('setError', e);
				commit('setLoading', false);
			});
	},
	updateGrocery({commit, rootState, dispatch}, grocery) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(rootState.api_url + '/api/groceries/' + grocery.id, grocery)
			.then((res) => {
				commit('setError', null);
				dispatch('getGroceries');
			})
			.catch((e) => {
				commit('setError', e);
				commit('setLoading', false);
			});
	},
	changeGroceryStatus({commit, rootState, dispatch}, obj) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.post(rootState.api_url + '/api/groceries/' + obj.id + '/status', {status: obj.status})
			.then((res) => {
				commit('setError', null);
				commit('setSuccess', 'Grocery status changed');
				dispatch('getGroceries');
			})
			.catch((e) => {
				commit('setError', e);
				commit('setLoading', false);
			});
	},
	deleteGrocery({commit, rootState, dispatch}, groceryId) {
		commit('setLoading', true);
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.token;
		axios.delete(rootState.api_url + '/api/groceries/' + groceryId)
			.then((res) => {
				commit('setError', null);
				dispatch('getGroceries');
			})
			.catch((e) => {
				console.log(e);
				var eData = e.response.data;
				commit('setError', eData);
				commit('setLoading', false);
			});
	}
};

export default {
	state,
	getters,
	mutations,
	actions
}