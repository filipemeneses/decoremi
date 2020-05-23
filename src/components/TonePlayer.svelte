<script context="module">
    let audioContext
    let masterGainNode
    let customWaveform
</script>

<script>
    import { onMount } from 'svelte'

    export let note

    $: playFrequency(note.frequency)

    onMount(() => {
      audioContext = new (window.AudioContext || window.webkitAudioContext)()
      masterGainNode = audioContext.createGain()
      masterGainNode.connect(audioContext.destination)
      masterGainNode.gain.value = 0.2
      const imag = new Float32Array([0, 0, 1, 0, 1])
      const real = new Float32Array(imag.length)
      customWaveform = audioContext.createPeriodicWave(real, imag)
    })

    function playFrequency (frequency) {
      if (!audioContext) return
      const osc = audioContext.createOscillator()
      osc.connect(masterGainNode)
      osc.setPeriodicWave(customWaveform)
      osc.frequency.value = frequency
      osc.start()
      setTimeout(() => {
        osc.stop()
      }, 500)
    }
</script>