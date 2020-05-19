<template>
	<div>
		<h1>Part One</h1>
		<h3>Vectors & Particles: Position, Velocity, and Acceleration</h3>
		<Workspace>
			<div id="ball"></div>
		</Workspace>
	</div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import Workspace from '@/components/Workspace.vue'
import { Vector3, Particle } from 'coma-physics'

@Component({
	components: {
		Workspace,
	},
})
export default class PartOne extends Vue {
	name = 'PartOne'
	position!: Vector3
	velocity!: Vector3
	acceleration = new Vector3(0, -1, 0)
	damping = 0.999
}
</script>

<style lang="scss" scoped>
#ball {
	height: 30px;
	width: 30px;
	border: none;
	border-radius: 50%;
	background-color: #fefefe;
	position: absolute;
	top: 15px;
	left: 15px;
	margin: 0;
}
</style>
