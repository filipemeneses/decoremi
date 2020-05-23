	
<div class="notes" out:fade>
	{#each notes as note}
		<div class="note" on:click={choose(note)}>{getNoteName(note)}</div>
	{/each}
</div>

<script>
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let notes = []

	const dispatch = createEventDispatcher();
	let noteNames = ['C','D', 'E', 'F', 'G', 'A', 'B']

	function choose(note) {
		dispatch('choose', note);
	}
	function getNoteName (note) {
		return noteNames[note % 7]
	}
</script>

<style>
	.notes {
		display: flex;
		width: 100%;
		height: 76px;
		box-sizing: border-box;
		justify-content: stretch;
		align-content: stretch;
		padding: 4px;
	}
	.note {
		flex: 1;
		background-color: var(--color-black);
		color: var(--color-white);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 32px;
		cursor: pointer;
		font-family: Georgia, 'Times New Roman', Times, serif;
		margin: 2px;
		box-sizing: border-box;
		text-decoration: underline;
	}
	.note:hover {
		background-color: var(--color-black--light);
	}
</style>
