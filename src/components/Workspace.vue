<template>
	<div :class="[settingActive ? 'setting' : '']">
		<div class="stats">
			<p>
				Current Position: <span>x: {{ currentPosition.x }}</span
				><span>y: {{ currentPosition.y }}</span>
			</p>
			<p>
				Current Velocity: <span>x: {{ currentVelocity.x }}</span
				><span>y: {{ currentVelocity.y }}</span>
			</p>
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'
	import { Vector3 } from 'coma-physics'

	@Component
	export default class Workspace extends Vue {
		@Prop() settingActive!: boolean
		@Prop() currentPosition!: Vector3
		@Prop() currentVelocity!: Vector3
	}
</script>

<style lang="scss" scoped>
	div {
		width: 95vw;
		height: 60vh;
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
</style>