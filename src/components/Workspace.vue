<template>
	<div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class Workspace extends Vue {}
</script>

<style scoped>
	div {
		width: 90vw;
		height: 60vh;
		border: 1px solid #42b983;
		margin: 50px auto 0;
		background: #3c3c3c;
		position: relative;
	}
</style>