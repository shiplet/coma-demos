<template>
	<div :class="[settingActive ? 'setting' : '']">
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class Workspace extends Vue {
		@Prop() settingActive!: boolean
	}
</script>

<style lang="scss" scoped>
	div {
		width: 60vw;
		height: 50vh;
		border: 1px solid #42b983;
		margin: 50px auto 0;
		background: #3c3c3c;
		position: relative;
		overflow: hidden;

		.setting > * {
			&:hover {
				cursor: grab;
			}

			&:active {
				cursor: grabbing;
			}
		}
	}

	@media all and (max-width: 1024px) {
		div {
			width: 90vw;
		}
	}
</style>