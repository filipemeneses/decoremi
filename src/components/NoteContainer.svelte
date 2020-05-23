<div>
    <svg viewBox="0 0 320 547">
        <text x="-16" y={32 + 128 + (6 * 32)} style="font-size: 194px;">&#119070;</text>
        <rect x="300" y={32 + 128 + (6 * 32) - 128} width="3" height="130"/>
        <rect x="309" y={32 + 128 + (6 * 32) - 128} width="13" height="130"/>
        <text x="160" y={$notePosition} style="font-size: 164px;">&#119133;</text>

        {#each Array(highNotes) as _, index}
            <rect x="160" y={32 + (32 * 5) - (index * 32)} width="60" height="2" in:fly="{{ y: 32 + (32 * 5) - (index * 32), duration: 200 }}" out:fly="{{ y: 32 + (32 * 5), duration: 200}}"/>
        {/each}

        {#each Array(5) as _, index}
            <rect x="0" y={32 + (6 + index) * 32} width="320" height="2"/>
        {/each}

        {#each Array(lowNotes) as _, index}
            <rect x="160" y={32 + (6 + 5 + index) * 32} width="60" height="2" in:fly="{{ y: 32 + (6 + 5 + index) * 32, duration: 200 }}" out:fly={{ y: 32 + (6 + 5) * 32, duration: 200 }}/>
        {/each}
    </svg>
</div>

<script>
	import { fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

    export let note

	let notePosition = tweened(0, {
		duration: 400,
		easing: cubicOut
    });

    $: notePosition.set(64 + note * 16)
    $: highNotes = note < 12 ? (6 - Math.floor(note / 2)) : 0
    $: lowNotes = note > 19 ? Math.floor((note - 19) / 2) : 0
</script>

<style>
div {
    display: flex;
    justify-content: center;
    align-items: center;
}
svg {
    width: 100%;
    height: calc(100vh - 144px);
    fill: var(--color-black);
}
</style>