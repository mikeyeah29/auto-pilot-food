<template>
	
	<div>
		
		<h1>Create List From Stock</h1>

		<div :class="'question' + ( $store.state.loading ? ' loading' : '' )" 
			>

			<p class="question_title m-0" v-if="complete">List Complete</p>

			<div v-else>

				<p class="question_title">List Name</p>

				<input v-model="name" class="mb-3" />

				<p class="question_title" v-if="items.length > 0">
					Do we need {{ items[itemIndex].name }}?
				</p>
				<div class="d-flex justify-content-center mb-3">
					<div class="button button--blue mx-1" @click="skipItem">Nope</div>
					<div class="button mx-1" @click="addItem">Yep</div>
				</div>
			</div>

			<span>{{ name }} should cost about £{{ estimate }}</span>
		</div>

		<div class="d-flex justify-content-center">
			<router-link class="link mt-3 mr-2" to="/lists">< Cancel</router-link>
			<div class="d-block mt-3 link text-center ml-2" @click="goToList" v-if="complete">Go to list ></div>
			<div class="d-block mt-3 link text-center ml-2" @click="goToList" to="/" v-else>Skip and go to list ></div>
		</div>

	</div>

</template>

<script>
	
	export default {
		name: 'ShoppingLists',
		data() {
			return {
				name: 'Normal shopping',
				list: [],
				estimate: 0,
				itemIndex: 0,
				complete: false
			}
		},
		computed: {
			items() {
				return this.$store.state.groceries.stock;
			}
		},
		methods: {
			addItem() {
				var item = this.items[this.itemIndex];
				this.list.push(item.id);
				this.estimate += Number(item.price);
				if(this.itemIndex < this.items.length - 1) {
					this.itemIndex++;
				}else{
					this.complete = true;
				}
			},
			skipItem() {
				if(this.itemIndex < this.items.length - 1) {
					this.itemIndex++;
				}else{
					this.complete = true;
				}
			},
			goToList() {
				this.$store.dispatch('addShoppingList', {
					name: this.name,
					grocery_ids: this.list
				});
			}
		},
		mounted() {
			if(this.$store.state.groceries.stock.length < 1) {
				this.$store.dispatch('getStockGroceries');
			}
		}
	}

</script>

<style lang="scss">
	
	.question {
		width: 100%;
		min-height: 100px;
		background: #5bd2b2;
		padding: 24px;
		text-align: center;
		border-radius: 5px;
		color: #0b4434;
	}

	.question_title {
		font-size: 22px;
	}

	.link {
		text-decoration: underline;
		background: none;
		color: #000;
	}
	
</style>