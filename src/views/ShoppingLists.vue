<template>
	
	<div :class="{ loading: $store.state.loading }">

		<BreadCrumbs :links="[
			{ path: '', label: 'lists' },
			// { path: '', label: 'Shopping Lists' }
		]" />

		<h1>Shopping Lists</h1>

		<div class="list">
			<div v-for="list in $store.state.shopping_lists.shopping_lists"
				class="item d-flex justify-content-between align-items-center mb-2">
				<span>{{ list.name }}</span>

				<div class="item-actions">
					<router-link :to="'/lists/show/' + list.id">View</router-link>
				</div>

			</div>
		</div>

		<router-link to="/lists/create-from-stock" class="floating-action-button action-add" 
		@click="">+</router-link>

		<!-- <FormModal :is_open="addModalIsOpen" @close="addModalIsOpen = false">

			<h2>Add Shopping List</h2>



		</FormModal> -->

	</div>

</template>

<script>
	
	import FormModal from '../components/FormModal';
	import BreadCrumbs from '../components/BreadCrumbs';

	export default {
		name: 'ShoppingLists',
		components: {
			FormModal,
			BreadCrumbs
		},
		data() {
			return {
				addModalIsOpen: false
			}
		},
		mounted() {
			this.$store.dispatch('getShoppingLists');
		}
	}

</script>

<style lang="scss">
	
	
	
</style>