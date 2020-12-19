<template>
	
	<div class="breadcrumbs">
		<div class="breadcrumb-link" v-for="link in links">
			<router-link :to="link.path">{{ link.label }}</router-link>
			<span> > </span>
		</div>
	</div>

</template>

<script type="text/javascript">
	
	export default {
		name: 'BreadCrumbs',
		props: ['links']
	}

</script>

<style lang="scss">
	
	.breadcrumbs {
		margin-bottom: 16px;
		background: #88e084;
		padding: 4px 12px;
		border-radius: 3px;
		span {
			margin: 0px 8px;
		}
		a, span {
			background: transparent;
			color: #0c3e22;
		}
	}

	.breadcrumb-link {
		display: inline-block;
		&:last-child a {
			color: #8c366d;
		}
		&:last-child span {
			display: none;
		}
	}

</style>