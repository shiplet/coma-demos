<template>
	<router-link :to="to">
		<div>
			{{ title }}
		</div>
	</router-link>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class NavButton extends Vue {
		@Prop() to!: string
		@Prop() title!: string
	}
</script>

<style lang="scss" scoped>
	div {
		display: inline-block;
		padding: 15px 20px;
		border: 1px solid #42b983;
		border-radius: 4px;
		margin: 15px;
		transition: box-shadow 0.1s ease-out;
		cursor: pointer;

		&:hover {
			box-shadow: inset 0px 0px 20px -13px rgba(66, 185, 131, 1);
		}

		&:active {
			background-color: rgba(66, 185, 131, 0.15);
		}

		& * {
			text-decoration: none;
		}
	}
</style>
