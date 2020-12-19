<template>
	
	<div :class="{ loading: $store.state.loading }">
		<h1 class="h1">Groceries to keep in stock</h1>

		<div class="info-box">
			<p>This is a list of all items that need to allways be in the house.</p>
			<p class="m-0">For example milk, bread, eggs, bin bags etc</p>
		</div>

		<div class="list">
			
			<div :class="'item area-' + item.area + ' d-flex justify-content-between align-items-center mb-2'"  v-for="item in groceries">

				<span>{{ item.name }} - <em>{{ item.area }}</em></span>

			</div>

		</div>

		<div class="floating-action-button action-add" 
		@click="addModalIsOpen = true">+</div>

	</div>

</template>

<script>
	
	export default {
		name: 'StockItems',
		data() {
			return {
				areas: ['Dairy', 'Baked', 'Fresh', 'Meat', 'House Stuff', 'Misc'],
			}
		},
		computed: {
			groceries() {
				return this.$store.state.groceries.groceries;
			}
		},
		mounted() {
			this.$store.dispatch('getStockGroceries');
		}
	}

</script>

<style lang="scss">
	
	.list {
		background: #fff;
		padding: 10px;
		border-radius: 3px;
		border: solid 2px #989898;
	}
	
</style>