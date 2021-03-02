<template>
	<div class="home">
		<img src="../assets/logo.png" alt="" />
		<h1>Welcome to Coma Physics</h1>
		<p>
			This is the companion site for everything I'm learning about building a
			physics engine for the DOM.
		</p>
		<p>
			It contains demos and hands-on explanations for each of the concepts that
			go into buildng a physics engine.
		</p>
		<p>
			To follow along on my blog, visit
			<a
				href="https://shiplet.dev"
				target="_blank"
				rel="noopener noreferrer"
				>shiplet.dev</a
			>
		</p>
		<p>
			And the coma-physics repo lives on
			<a
				href="https://github.com/shiplet/coma-physics"
				target="_blank"
				rel="noopener noreferrer"
				>github</a
			>.
		</p>
		<p>Stay tuned for updates!</p>
		<p>
			<a
				href="https://twitter.com/mikeshiplet"
				target="_blank"
				rel="noopener noreferrer"
				>-Shiplet</a
			>
		</p>

		<Gallery>
			<NavButton to="/part-1" title="Part 1" />
		</Gallery>
	</div>
</template>

<script>
	// @ is an alias to /src
	import NavButton from '@/components/NavButton'
	import Gallery from '@/components/Gallery'

	export default {
		name: 'Home',
		components: {
			Gallery,
			NavButton,
		},
	}
</script>

<style lang="scss" scoped>
	a,
	a:visited,
	a:active {
		color: #42b983;
		text-decoration: none;
	}
</style>
