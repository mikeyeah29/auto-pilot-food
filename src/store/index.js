import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import groceries from './groceries'
import shopping_lists from './shopping_lists'

Vue.use(Vuex)

var localUrl = 'http://localhost:8888/auto_pilot_api/public';
var liveUrl = 'https://autopilot.rwdstaging.co.uk';
var apiUrl = (window.location.href.indexOf("localhost") > -1 ? localUrl : liveUrl );

export default new Vuex.Store({
	state: {
		// api_url: 'http://localhost:8888/auto_pilot_api/public',
		api_url: apiUrl,
		errors: [],
		success: '',
		loading: false,
		token: localStorage.getItem('token') || '',
	},
	mutations: {
		auth(state, token) {
			state.token = token;
		},
		logout(state) {
			localStorage.clear('token');
			state.token = '';
		},
		setLoading(state, loading) {
			state.loading = loading;
		},
		setSuccess(state, message) {
			state.success = message;
		},
		setError(state, eData) {

			if(!eData || eData.length < 1) {
				state.errors = [];
				return;
			}

			if(Array.isArray(eData)) {
				state.errors = eData;
				return;
			}

			if(typeof eData === 'string') {
				state.errors = [ eData ];
			}

			if(typeof eData === 'object') {
				if(eData.response) {
					if(eData.response.data) {
						if(eData.response.data.errors) {
							var errs = [];
							for (const [key, value] of Object.entries(eData.response.data.errors)) {
								console.log(key);
								errs.push(value[0]);
							}
							state.errors = errs;
							return;
						}
						state.errors = [eData.response.data.message];
						return;
					}
					state.errors = [eData.status + ': ' + eData.statusText];
				}
				if(eData.message) {
					state.errors = [eData.message];
					return;
				}
			}

			state.errors = [eData];

		}
	},
	actions: {
		login({commit, state}, loginData) {

			commit('setLoading', true);
			commit('setError', []);

			return new Promise((resolve) => {

				axios.post(state.api_url + '/api/auth/login', loginData)
					.then((res) => {
						var token = res.data.access_token;
						localStorage.setItem('token', token);
						axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
						commit('auth', token);
						commit('setLoading', false);
						resolve();
					})
					.catch((e) => {
						console.log('e.response ', e.response);
						commit('setError', e);
						commit('setLoading', false);
					});

			});

		}
	},
	getters: {
		isLoggedIn(state) {
			return !!state.token;
		}
	},
	modules: {
		groceries,
		shopping_lists
	}
})
