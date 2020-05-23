<div
	class="AnsweredMessage"
    on:click={() => dispatch('continue')}  
	in:surge={{y: 64, duration: 280}}
    style={`border-color: ${color}`}
>
    <div class="container">
		<div class="message" in:fade={{duration: 280, delay: 280}}>
			<div class="emoji" in:fade={{duration: 280, delay: 360}}>{correctAnswer === chosedNote ? "👍" : "👎"}</div>
			<div class="arrow" in:fly={{x: -15, duration: 280, delay: 360}}><ArrowRight/></div>
		</div>
	</div>
</div>

<script>
	import ArrowRight from '@/ArrowRight.svelte'
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { sineIn } from 'svelte/easing';

    const dispatch = createEventDispatcher();

	export let correctAnswer
    export let chosedNote
    
    $: color = correctAnswer === chosedNote ? 'green' : 'orange'

	function surge(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = sineIn(t);

				return `
					transform: scaleX(${eased});
					transform-origin: bottom left;
					will-change: transform;
				`
			}
		};
	}
</script>

<style>
	.AnsweredMessage {
		display: flex;
		width: 100%;
		height: 76px;
		align-content: stretch;
        box-sizing: border-box;
		padding: 12px 12px 0 0;
		margin-left: 6px;
		margin-bottom: 6px;
		box-sizing: border-box;
	}
	.container {
		background-color: var(--color-black);
		color: var(--color-white);
		font-size: 32px;
		width: 100%;
	}
	.message {
		display: flex;
		height: 100%;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		fill: var(--color-white);
	}
	.emoji {
		line-height: 0;
		margin: 16px;
		font-size: 24px;
	}
	.arrow {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		max-height: 100%;
		margin: 16px;
	}
</style>
