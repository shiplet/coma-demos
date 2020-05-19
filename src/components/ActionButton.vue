<template>
	<div>
		<button
			:class="[active ? 'active' : '', type]"
			v-on:click.prevent="runAction"
		>
			{{ title }}
		</button>
	</div>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from 'vue-property-decorator'

	@Component
	export default class ActionButton extends Vue {
		@Prop() title!: string
		@Prop() action!: Function
		@Prop() active!: boolean
		@Prop() type!: string

		runAction() {
			this.action()
		}
	}
</script>

<style lang="scss" scoped>
	button {
		border: 1px solid #fefefe;
		border-radius: 4px;
		background: #2c2c2c;
		color: #fefefe;
		padding: 15px 20px;
		margin: 0 15px;
		cursor: pointer;

		&.active {
			background: rgba(255, 255, 255, 0.25);
		}

		&:hover {
			box-shadow: inset 0px 0px 20px -13px #fefefe;
		}

		&:active {
			background: rgba(255, 255, 255, 0.15);
		}

		&.caution {
			border: 1px solid #eb2d2d;

			&:hover {
				box-shadow: inset 0px 0px 20px -13px #eb2d2d;
			}

			&:active {
				background: rgba(235, 45, 45, 0.15);
			}
		}
	}
</style>