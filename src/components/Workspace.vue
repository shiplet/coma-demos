<template>
	<div class="container" :class="[settingActive ? 'setting' : '']">
		<div class="stats">
			<div>
				<p>Position:</p>
				<div class="inner-container">
					<p>x: {{ telemetryPosition.x.toFixed(2) }}</p>
					<p>y: {{ telemetryPosition.y.toFixed(2) }}</p>
				</div>
			</div>
			<p>Velocity:</p>
			<div class="inner-container">
				<p>x: {{ telemetryVelocity.x.toFixed(2) }}</p>
				<p>y: {{ telemetryVelocity.y.toFixed(2) }}</p>
			</div>
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
		@Prop() telemetryPosition!: Vector3
		@Prop() telemetryVelocity!: Vector3
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 95vw;
		height: 60vh;
		border: 1px solid #42b983;
		margin: 50px auto 0;
		background: #3c3c3c;
		position: relative;
		overflow: hidden;

		.stats {
			width: 12vw;
			min-width: 180px;
			text-align: left;
			position: absolute;
			padding: 0 0 15px 15px;
			top: 0;
			right: 0;
			border-left: 1px solid #42b983;
			border-bottom: 1px solid #42b983;
			.inner-container {
				display: flex;
				justify-content: flex-start;
				p {
					width: 80px;
					margin: 0 5px 0 15px;
				}
			}
			span {
				margin-right: 15px;
			}
		}

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
