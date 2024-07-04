<script lang="ts">
	import { messages, send } from '$lib/index'
	import { onMount } from 'svelte';

	let msgs = [] as string[]
	let draft = ""

	async function receive() {
		for await (const msg of messages()) {
			msgs = [...msgs, msg]
		}
	}

	async function submit() {
		await send(draft)
		draft = ""
	}

	onMount(() => {
		receive()
	})
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#each msgs as msg}
<p>received: {msg}</p>
{/each}

<input bind:value={draft}/>
<button on:click={submit}>text</button>
