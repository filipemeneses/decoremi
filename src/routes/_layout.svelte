<style>
	:global(:root) {
		--spacing-unit: 0.375em;
		--color-white: white;
		--color-black: rgb(27, 27, 27);
		--color-black--light: rgb(83, 83, 83);
	}
	main {
		position: relative;
		max-width: 56em;
		margin: 0 auto;
		box-sizing: border-box;
		height: 100%;
	}
</style>

<svelte:head>
	<title>Decoremi</title>
</svelte:head>

<main>
	<slot></slot>
</main>