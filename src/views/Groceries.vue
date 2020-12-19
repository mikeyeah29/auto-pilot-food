<template>
	
	<div :class="{ loading: $store.state.loading }">
		<h1 class="h1">Groceries</h1>

		<div class="info-box">
			<p class="m-0">This is a list of all possible items, the star indicates that it is an item to keep in stock</p>
		</div>

		<div class="groceries list">
			
			<div :class="'item area-' + item.area + ' d-flex justify-content-between align-items-center mb-2'" 
				 v-for="item in groceries">

				<span>{{ item.name }} - <em>{{ item.area }}</em></span>

				<div class="item-actions">
					<span class="ml-2 icon_btn icon_star" :class="{ is_selected: item.status === 'default' }" @click="toggleStatus(item)">
						<font-awesome-icon icon="star" />
					</span>
					<span class="ml-2 icon_btn" @click="openEditModal(item)">
						<font-awesome-icon icon="edit" />
					</span>
					<span class="ml-2 icon_btn bg-red">
						<font-awesome-icon icon="trash-alt" @click="openAys(item)" />
					</span>
				</div>

			</div>

		</div>

		<div class="floating-action-button action-add" 
		@click="addModalIsOpen = true">+</div>

		<FormModal :is_open="addModalIsOpen" @close="addModalIsOpen = false">

			<h2>Add Grocery</h2>

			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="addGroceryForm.name" />
			</div>

			<div class="form-group">
				<label>Area</label>
				<select v-model="addGroceryForm.area">
					<option v-for="area in areas" :value="area">{{ capitalize(area) }}</option>
				</select>
			</div>

			<div class="form-group">
				<label>Price</label>
				<input type="number" v-model="addGroceryForm.price" />
			</div>

			<button class="button" @click="addGrocery()">Add</button>

		</FormModal>

		<FormModal :is_open="editModalIsOpen" @close="editModalIsOpen = false">

			<h2>Edit {{ editGroceryForm.name }}</h2>

			<div class="form-group">
				<label>Name</label>
				<input type="text" v-model="editGroceryForm.name" />
			</div>

			<div class="form-group">
				<label>Area</label>
				<select v-model="editGroceryForm.area">
					<option v-for="area in areas" :value="area">{{ capitalize(area) }}</option>
				</select>
			</div>

			<div class="form-group">
				<label>Price</label>
				<input type="number" v-model="editGroceryForm.price" />
			</div>

			<button class="button" @click="updateGrocery()">Update</button>

		</FormModal>

		<ConfirmModal :is_open="ays_open"
					@confirmed="removeGrocery"
					@close="ays_open = false;" />

	</div>

</template>

<script>
	
	import FormModal from '../components/FormModal';
	import ConfirmModal from '../components/ConfirmModal';

	export default {
		name: 'Groceries',
		components: {
			FormModal,
			ConfirmModal
		},
		data() {
			return {
				addModalIsOpen: false,
				editModalIsOpen: false,
				ays_open: false,
				currentGroceryId: null,
				addGroceryForm: {
					name: '',
					area: '',
					price: '',
					status: 'other'
				},
				editGroceryForm: {
					name: '',
					area: '',
					price: '',
					status: 'other'
				},
				areas: ['fresh','dairy','meat','baked','tinned','frozen','other']
			}
		},
		computed: {
			groceries() {
				return this.$store.state.groceries.groceries;
			}
		},
		methods: {
			addGrocery() {
				this.$store.dispatch('addGrocery', this.addGroceryForm);
				this.addModalIsOpen = false;
			},
			removeGrocery() {
				this.$store.dispatch('deleteGrocery', this.currentGroceryId);
				this.ays_open = false;
			},
			openEditModal(item) {
				this.currentGroceryId = item.id;
				this.editGroceryForm.name = item.name;
				this.editGroceryForm.area = item.area;
				this.editGroceryForm.price = item.price;
				this.editModalIsOpen = true;
			},
			openAys(item) {
				this.currentGroceryId = item.id;
				this.ays_open = true;
			},
			updateGrocery() {
				var grocery = this.editGroceryForm;
				grocery.id = this.currentGroceryId;
				this.$store.dispatch('updateGrocery', grocery);
				this.editModalIsOpen = false;
			},
			toggleStatus(item) {
				this.$store.dispatch('changeGroceryStatus', {
					id: item.id,
					status: ( item.status === 'default' ? 'other' : 'default' )
				});
			},
			capitalize(string) {
				return string.charAt(0).toUpperCase() + string.slice(1);
			}
		},
		mounted() {
			this.$store.dispatch('getGroceries');
			// getGroceries
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

	.item {
		border-bottom: solid 2px #e8e6e6;
		padding-bottom: 8px;
		&:last-of-type {
			margin-bottom: 0px !important;
			border-bottom: none;
			padding-bottom: 0px;
		}
	}

	.groceries {
		.item {
			border-left: solid 4px #a54b63;
			padding-left: 10px;
			padding-bottom: 0px;
			border-bottom: none;
		}
		.area-dairy { border-color: #52afd4 };
		.area-fresh { border-color: #4ba567 };
		.area-tinned { border-color: #343a40 };
		.area-baked { border-color: #d4ae25 };
		.area-frozen { border-color: #4b6ba5 };
		.area-other { border-color: #989898 };
		.area-meat { border-color: #dd5b5b; };
	}

	.icon_switch {
		background: #fff;
		border: solid 3px #456;
	}
	
</style>