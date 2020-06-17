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
		@Prop() telemetryBus!: Vue
		@Prop() bus!: Vue

		particle?: Particle
		initialPosition = new Vector3(0, 0, 0)
		currentPosition = new Vector3(0, 0, 0)

		manualPositioning = false
		shouldAnimate = false
		animationFrame!: number

		mounted() {
			this.bus.$on('resetBall', this.resetBall)
			this.bus.$on('particle:type', this.animate)
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

		animate(particleType: string) {
			let lastTick = 0
			const windowWidth = window.innerWidth
			const windowHeight = window.innerHeight

			this.generateParticle(particleType)

			const animateOnFrame = (currentTime: number) => {
				if (lastTick === 0) lastTick = currentTime
				const duration = currentTime - lastTick

				try {
					this.particle?.integrate(duration / 1000)
					const pos = this.particle?.getPosition()
					if (pos) {
						this.currentPosition.x += pos.x
						this.currentPosition.y += pos.y
						this.telemetryBus.$emit('update', {
							pos: this.currentPosition,
							vel: this.particle?.getVelocity(),
						})
						if (
							Math.abs(this.currentPosition.x) >= windowWidth ||
							Math.abs(this.currentPosition.y) >= windowHeight
						) {
							console.log(this.currentPosition)
							cancelAnimationFrame(this.animationFrame)
							return
						}
					}
				} catch (e) {
					if (duration <= 0) {
						console.log('wait for nonzero duration')
					} else {
						console.error(e)
						return
					}
				}
				this.animationFrame = requestAnimationFrame(animateOnFrame)
			}

			this.animationFrame = requestAnimationFrame(animateOnFrame)
		}

		generateParticle(particleType: string) {
			let velocity, acceleration
			const position = new Vector3(0, 0, 0)

			switch (particleType) {
				case 'pistol':
					velocity = new Vector3(35, 0, 0)
					acceleration = new Vector3(0, -1, 0)
					this.particle = new Particle(position, velocity, acceleration, 0.999)
					this.particle.setMass(2)
					break
				case 'artillery':
					velocity = new Vector3(40, 30, 0)
					acceleration = new Vector3(0, -20, 0)
					this.particle = new Particle(position, velocity, acceleration, 0.999)
					this.particle.setMass(200)
					break
				case 'fireball':
					velocity = new Vector3(10, 0, 0)
					acceleration = new Vector3(0, 0.6, 0)
					this.particle = new Particle(position, velocity, acceleration, 0.999)
					this.particle.setMass(1)
					break
				case 'laser':
					velocity = new Vector3(100, 0, 0)
					acceleration = new Vector3(0, 0, 0)
					this.particle = new Particle(position, velocity, acceleration, 0.999)
					this.particle.setMass(0.1)
					break
				case 'bomb':
					velocity = new Vector3(0.1, 0.25, 0)
					acceleration = new Vector3(0, -0.15, 0)
					this.particle = new Particle(position, velocity, acceleration, 0.99)
					this.particle.setMass(200)
					break
			}
		}

		resetState() {
			this.manualPositioning = false
		}

		resetBall() {
			this.shouldAnimate = false
			this.particle = undefined
			this.currentPosition = new Vector3(0, 0, 0)
			this.bus.$emit('update', {
				pos: new Vector3(0, 0, 0),
				vel: new Vector3(0, 0, 0),
			})
			cancelAnimationFrame(this.animationFrame)
		}
	}
</script>

<style lang="scss" scoped>
	#ball {
		height: 20px;
		width: 20px;
		border: none;
		border-radius: 50%;
		background-color: #fefefe;
		position: absolute;
		top: 50%;
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
