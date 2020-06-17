<template>
	<div>
		<h1>Part One</h1>
		<h3>Vectors & Particles: Position, Velocity, and Acceleration</h3>
		<Workspace
			:settingActive="settingPosition"
			:telemetryPosition="telemetryPosition"
			:telemetryVelocity="telemetryVelocity"
		>
			<Ball
				:settingPosition="settingPosition"
				:settingVelocity="settingVelocity"
				:bus="bus"
				:telemetryBus="bus"
			/>
		</Workspace>
		<Gallery>
			<ActionButton title="Pistol" :action="() => animate('pistol')" />
			<ActionButton title="Artillery" :action="() => animate('artillery')" />
			<ActionButton title="Fireball" :action="() => animate('fireball')" />
			<ActionButton title="Laser" :action="() => animate('laser')" />
			<ActionButton title="Bomb" :action="() => animate('bomb')" />
			<ActionButton title="Reset" :action="resetOptions" type="caution" />
		</Gallery>
	</div>
</template>

<script lang="ts">
	// @ is an alias to /src
	import { Component, Vue } from 'vue-property-decorator'
	import ActionButton from '@/components/ActionButton.vue'
	import Ball from '@/components/Ball.vue'
	import Gallery from '@/components/Gallery.vue'
	import Workspace from '@/components/Workspace.vue'
	import { Vector3, Particle } from 'coma-physics'

	interface TelemetryUpdate {
		pos: Vector3
		vel: Vector3
	}

	@Component({
		components: {
			ActionButton,
			Ball,
			Gallery,
			Workspace,
		},
	})
	export default class PartOne extends Vue {
		settingPosition = false
		settingVelocity = false
		telemetryPosition = new Vector3(0, 0, 0)
		telemetryVelocity = new Vector3(0, 0, 0)
		bus = new Vue()

		mounted() {
			this.bus.$on('update', this.update)
		}

		update(tick: TelemetryUpdate) {
			this.telemetryPosition = tick.pos
			this.telemetryVelocity = tick.vel
		}

		setPosition() {
			this.resetOptions()
			this.settingPosition = true
		}

		setVelocity() {
			this.resetOptions()
			this.settingVelocity = true
		}

		animate(particleType: string) {
			this.bus.$emit('particle:type', particleType)
		}

		resetOptions() {
			this.settingPosition = false
			this.settingVelocity = false
			this.bus.$emit('resetBall')
		}
	}
</script>
