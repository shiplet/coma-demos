<template>
	<div
		id="ball"
		:class="[isActive(), isManualPositioning()]"
		:style="currentStyle"
		v-on:mousedown.prevent="setState"
		v-on:mousemove.prevent="updateState"
		v-on:mouseup.prevent="resetState"
		v-on:mouseout.prevent="resetState"
	/>
</template>

<script lang="ts">
	import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
	import { Vector3, Particle } from 'coma-physics'

	interface StyleUpdate {
		x: number
		y: number
	}

	@Component
	export default class Ball extends Vue {
		@Prop() settingPosition!: boolean
		@Prop() settingVelocity!: boolean
		@Prop() bus!: Vue

		particle!: Particle
		initialPosition = new Vector3(0, 0, 0)
		currentPosition = new Vector3(0, 0, 0)
		initialVelocity = new Vector3(1, 0, 0)
		acceleration = new Vector3(0, -0.035, 0)
		damping = 0.999

		manualPositioning = false
		shouldAnimate = false
		animationFrame!: number
		start = 0

		mounted() {
			this.bus.$on('resetBall', this.resetBall)
			this.bus.$on('animate', this.animate)
			this.particle = new Particle(
				this.initialPosition,
				this.initialVelocity,
				this.acceleration,
				this.damping,
			)

			this.particle.setMass(1)
		}

		get currentStyle(): string {
			return `transform: translate3d(${this.currentPosition.x}px, ${this
				.currentPosition.y * -1}px, 0)`
		}

		isActive() {
			return this.settingPosition || this.settingVelocity ? 'active' : ''
		}

		isManualPositioning() {
			return this.manualPositioning ? 'manualPositioning' : ''
		}

		setState(e: MouseEvent) {
			if (this.isActive()) {
				this.manualPositioning = true
				if (this.initialPosition.x === 0 && this.initialPosition.y === 0) {
					this.initialPosition.x = e.clientX
					this.initialPosition.y = e.clientY
				}
			}
		}

		shouldUpdateState(): boolean {
			return this.isActive && this.manualPositioning
		}

		updateState(e: MouseEvent) {
			if (this.shouldUpdateState()) {
				this.currentPosition.x = e.clientX - this.initialPosition.x
				this.currentPosition.y = e.clientY - 1 - this.initialPosition.y
			}
		}

		animate() {
			this.start = performance.now()

			const animateOnFrame = () => {
				try {
					this.particle.integrate((performance.now() - this.start) / 1000)
					const pos = this.particle.getPosition()
					this.currentPosition.x += pos.x
					this.currentPosition.y += pos.y
				} catch (e) {
					setTimeout(() => {
						console.log('wait for non-zero duration')
					}, 0)
				}
				this.animationFrame = requestAnimationFrame(animateOnFrame)
			}

			animateOnFrame()
		}

		resetState() {
			this.manualPositioning = false
		}

		resetBall() {
			this.shouldAnimate = false
			this.initialPosition = new Vector3(0, 0, 0)
			this.currentPosition = new Vector3(0, 0, 0)
			this.initialVelocity = new Vector3(1, 0, 0)
			this.particle = new Particle(
				this.initialPosition,
				this.initialVelocity,
				this.acceleration,
				this.damping,
			)
			this.start = 0
			cancelAnimationFrame(this.animationFrame)
		}
	}
</script>

<style lang="scss" scoped>
	#ball {
		height: 80px;
		width: 80px;
		border: none;
		border-radius: 50%;
		background-color: #fefefe;
		position: absolute;
		top: 15px;
		left: 15px;
		margin: 0;

		&.active {
			cursor: grab;
			&.manualPositioning {
				cursor: grabbing;
			}
		}
	}
</style>