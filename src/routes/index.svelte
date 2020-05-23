<div>
	<NoteContainer note={currentNote}/>
	<footer>
		<div><Chooser bind:notes={notes} on:choose={({ detail }) => chooseNote(detail)}/></div>
		{#if isAnswered}
			<div><AnsweredMessage chosedNote={chosedNote} correctAnswer={currentNote} on:continue={nextStep}/></div>
		{/if}
	</footer>
</div>

<script>
import NoteContainer from '@/NoteContainer.svelte'
import AnsweredMessage from '@/AnsweredMessage.svelte'
import Chooser from '@/Chooser.svelte'
import notesFrequencyByOctave from '@/notesFrequencyByOctave.json'

let chosedNote = null
let step = 0
const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
const MIN_INDEX = 7
const MAX_INDEX = 24
let randomIndexes = []

$: step % (MAX_INDEX - MIN_INDEX) === 0 && (randomIndexes = shuffle(Array.from(Array(MAX_INDEX - MIN_INDEX + 1)).map((_, i) => MIN_INDEX + i)))
$: currentNote = noteInterface(randomIndexes[step])
$: pairNote = randomNoteExcluding(currentNote.index)
$: notes = [...(currentNote.index % 2 ? [currentNote, pairNote] : [pairNote, currentNote])]
$: isCorrect = chosedNote === currentNote
$: isAnswered = chosedNote !== null

function shuffle (array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = [...array]
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}
function nextStep () {
  chosedNote = null
  step = (step + 1) % (MAX_INDEX - MIN_INDEX)
}
function chooseNote (note) {
  if (isAnswered) return
  chosedNote = note
}
function randomNoteExcluding (excludedIndex) {
  const index = randomIndex(MAX_INDEX - 1)
  return noteInterface(index + (index >= excludedIndex))
}
function randomNoteGivenStep (step) {
  return randomNote()
}
function randomNote (max = MAX_INDEX) {
  return noteInterface(randomIndex(max))
}
function randomIndex (max = MAX_INDEX, min = MIN_INDEX) {
  return Math.floor(Math.random() * (max - min)) + min
}
function noteInterface (noteIndex) {
  const octave = !noteIndex ? 6 : 7 - Math.ceil(noteIndex / 7.1)
  const name = noteNames[6 - ((noteIndex - 1) % 7)]

  return {
    index: noteIndex,
    octave,
    name,
    frequency: getNoteFrequency(octave, name)
  }
}
function getNoteFrequency (octave, name) {
  return notesFrequencyByOctave[octave][name]
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