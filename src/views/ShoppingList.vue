<template>
	<div :class="{ loading: $store.state.loading }">
		<BreadCrumbs v-if="list" :links="[
			{ path: '/lists', label: 'lists' },
			{ path: '', label: list.name }
		]" />

		<div v-if="list">
			
			<h1 class="mb-2">{{ list.name }}</h1>

			<div class="d-flex align-items-center mb-2">
				<p class="estimate">Estimated Cost: £{{ estimated }}</p>

				<router-link class="link d-block ml-auto" :to="'/lists/edit/' + $route.params.id">Edit list</router-link>
			</div>

			<div class="groceries list">

				<div :class="'item area-' + item.grocery.area + ' d-flex justify-content-between align-items-center mb-2' + ( item.in_basket ? ' done' : '' )" 
					 v-for="(item, i) in items">
					<span>{{ item.grocery.name }}</span>
					<span class="ml-auto mr-3">£{{ item.grocery.price.toFixed(2) }}</span>
					<div class="item_cb">
						<label :for="'item_' + i">
							<font-awesome-icon icon="check" v-if="item.in_basket" />
						</label>
						<input type="checkbox" :id="'item_' + i" @click="toggleItem(i)" />
					</div>
				</div>

			</div>

			<span class="mt-3 icon_btn icon_btn--big bg-red" @click="openAys()">
				<span class="mr-1">Delete List</span>
				<font-awesome-icon icon="trash-alt" />
			</span>

		</div>

		<ConfirmModal :is_open="ays_open"
					@confirmed="deleteList"
					@close="ays_open = false;" />

	</div>
</template>

<script type="text/javascript">
	
	import BreadCrumbs from '../components/BreadCrumbs';
	import ConfirmModal from '../components/ConfirmModal';

	export default {
		name: 'ShoppingList',
		data() {
			return {
				list: {
					items: []
				},
				ays_open: false
			};
		},
		methods: {
			toggleItem(i) {
				console.log(i);
				this.list.items[i].in_basket = !this.list.items[i].in_basket;
				console.log(this.list.items[i].in_basket);
			},
			openAys() {
				this.ays_open = true;
			},
			deleteList() {
				this.$store.dispatch('deleteShoppingList', this.list.id);
				this.ays_open = false;
			}
		},
		computed: {
			items() {
				return this.list.items;
			},
			estimated() {
				var cost = 0;
				this.list.items.forEach((item) => {
					cost += item.grocery.price;
				});
				return cost.toFixed(2);
			}
		},
		components: {
			BreadCrumbs,
			ConfirmModal
		},
		created() {
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

	.done {
	    text-decoration: line-through;
	}

	.estimate {
		margin: 0px;
		color: #0b4424;
	}

</style>