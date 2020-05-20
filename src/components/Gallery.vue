<template>
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import { Component, Vue } from 'vue-property-decorator'

	@Component
	export default class Gallery extends Vue {}
</script>

<style lang="scss" scoped>
	div {
		margin-top: 25px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
