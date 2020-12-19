<template>
	<div :class="{ loading: $store.state.loading }">
		<BreadCrumbs v-if="list" :links="[
			{ path: '/lists', label: 'lists' },
			{ path: '', label: list.name }
		]" />

		<div v-if="list">
			
			<h1 class="mb-2">Edit {{ list.name }}</h1>

			<router-link class="link d-block mb-2" :to="'/lists/show/' + $route.params.id">Done</router-link>

			<!-- <vue-bootstrap-typeahead 
			  :minMatchingChars="1"
			  v-model="q"
			  :data="$store.state.groceries.groceries"
			  @click="q = ''"
			/> -->

			<AutoComplete @itemSelected="addGroceryToList" />

			<div class="groceries list">

				<div :class="'item area-' + item.grocery.area + ' d-flex justify-content-between align-items-center mb-2'" 
					 v-for="(item, i) in list.items">
					<span>{{ item.grocery.name }}</span>

					<div class="item-actions">
						<span class="ml-2 icon_btn bg-red">
							<font-awesome-icon icon="times" @click="openAys(item.id)" />
						</span>
					</div>

				</div>

			</div>

		</div>

		<ConfirmModal :is_open="ays_open"
					@confirmed="deleteItem"
					@close="ays_open = false;" />

	</div>
</template>

<script type="text/javascript">
	
	import BreadCrumbs from '../components/BreadCrumbs';
	import AutoComplete from '../components/AutoComplete';
	import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
	import ConfirmModal from '../components/ConfirmModal';

	export default {
		name: 'ShoppingListEdit',
		data() {
			return {
				q: '',
				list: {},
				ays_open: false,
				itemId: null
			}
		},
		components: {
			BreadCrumbs,
			VueBootstrapTypeahead,
			AutoComplete,
			ConfirmModal
		},
		methods: {
			deleteItem() {
				this.$store.dispatch('removeGroceryFromShoppingList', {
					itemId: this.itemId,
					shoppingListId: this.list.id
				}).then((res) => {
					console.log(res);
					this.getList();
					this.ays_open = false;	
				})
				.catch((e) => {
					this.$store.commit('setError', e);
					this.$store.commit('setLoading', false);
					this.ays_open = false;	
				});
			},
			openAys(id) {
				console.log(id);
				this.itemId = id;
				this.ays_open = true;	
			},
			addGroceryToList(grocery) {
				this.$store.dispatch('addGroceryToShoppingList', {
					groceryId: grocery.id,
					shoppingListId: this.list.id
				}).then((res) => {
					console.log(res);
					this.getList();
				})
				.catch((e) => {
					this.$store.commit('setError', e);
					this.$store.commit('setLoading', false);
				});
			},
			getList() {
				var shoppingId = this.$route.params.id;
				this.$store.dispatch('getShoppingList', shoppingId)
					.then((res) => {
						console.log(res);
						this.list = res.data.shopping_list;
						this.$store.commit('setLoading', false);
					})
					.catch((e) => {
						var eData = e; // .response.data;
						this.$store.commit('setError', eData);
						this.$store.commit('setLoading', false);
					});
			}
		},
		mounted() {
			if(this.$store.state.groceries.groceries.length === 0) {
				this.$store.dispatch('getGroceries');
			}
		},
		created() {
			this.getList();
		}
	}

</script>

<style lang="scss">
	
	.item_cb {
		display: flex;
		/* margin-top: 10px; */
		label {
			width: 20px;
			border: solid 2px #989898;
			height: 20px;
			border-radius: 4px;
			margin: 0px;
		}
		input {
			display: none;
		}
	}

</style>