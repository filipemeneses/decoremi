<div>
	<NoteContainer note={currentNote}/>
	<footer>
		<div><Chooser bind:notes={notes} on:choose={({detail}) => chooseNote(detail)}/></div>
		{#if isAnswered}
			<div><AnsweredMessage chosedNote={chosedNote} correctAnswer={currentNote} on:continue={nextStep}/></div>
		{/if}
	</footer>
</div>

<script>
	import Chooser from '@/Chooser.svelte'
	import NoteContainer from '@/NoteContainer.svelte'
	import AnsweredMessage from '@/AnsweredMessage.svelte'

	let chosedNote = null
	let step = 0

	$: currentNote = randomNote(step)
	$: pairNote = randomNoteExcluding(currentNote)
	$: notes = currentNote % 2 ? [currentNote, pairNote] : [pairNote, currentNote]
	$: isCorrect = chosedNote === currentNote
	$: isAnswered = chosedNote !== null

	function nextStep () {
		step += 1
		chosedNote = null
	}
	function chooseNote (option) {
		if (isAnswered) return
		chosedNote = option
	}
	function randomNoteExcluding (excluded) {
		let n = Math.floor(Math.random() * 32)
		return n + (excluded % n === 0)
	}
	function randomNote () {
		return Math.floor(Math.random() * 33)
	}
</script>

<style>
footer {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
}
footer > div {
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>