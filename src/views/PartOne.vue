<template>
	<div>
		<h1>Part One</h1>
		<h3>Vectors & Particles: Position, Velocity, and Acceleration</h3>
		<Workspace :settingActive="settingPosition">
			<Ball
				:settingPosition="settingPosition"
				:settingVelocity="settingVelocity"
				:bus="bus"
			/>
		</Workspace>
		<Gallery>
			<ActionButton title="Pistol" :action="() => animate('pistol')" />
			<ActionButton title="Artillery" :action="() => animate('artillery')" />
			<ActionButton title="Fireball" :action="() => animate('fireball')" />
			<ActionButton title="Laser" :action="() => animate('laser')" />
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
		bus = new Vue()

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
