<template>

	<div class="auto-complete">
		<label>Search groceries to add</label>
		<div class="d-flex">
			<input type="text" placeholder="Milk..." v-model="term" @keyup="typed($event)" />
			<!-- <div class="button">Add</div> -->
		</div>
		<ul class="suggestions">
			<li v-for="s in suggestions" class="d-flex justify-content-between align-items-center">
				<span class="title">{{ s.name }}</span>
				<div class="s-btn" @click="itemSelected(s)">+</div>
			</li>
		</ul>
	</div>

</template>

<script type="text/javascript">
	
	export default {
		name: 'AutoComplete',
		data() {
			return {
				term: '',
				suggestions: []
			}
		},
		methods: {
			typed(e) {
				var groceries = this.$store.state.groceries.groceries;
				this.suggestions = groceries.filter((g) => {
					if(g.name.toLowerCase().includes(this.term) && this.term !== '') {
						return g;
					}
				});
			},
			itemSelected(s) {
				this.term = '';
				this.suggestions = [];
				this.$emit('itemSelected', s);
			}
		}
	}

</script>

<style lang="scss">

	.auto-complete {
		margin-bottom: 20px;
		input {
			// border-radius: 3px 0px 0px 3px;
			// border-right: none;
			border-radius: 3px;
		}
		.button {
		    line-height: 2em;
		    border-radius: 0px 3px 3px 0px;
		}
		.suggestions {
			list-style: none;
			padding: 0px;
			margin: 0px;
			li {
				background: #fff;
				padding: 6px 8px;
				border: solid 2px #a7a7a7;
				border-top: 0px;
			}
		}
		.s-btn {
			width: 20px;
			height: 20px;
			background: #89e084;
			text-align: center;
			border-radius: 100%;
			color: #027d3a;
			font-size: 20px;
			display: block;
			line-height: 1em;
		}
	}

</style>