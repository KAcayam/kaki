<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { HTMLAttributes } from 'svelte/elements';

	export let id: string;
	export let label: string;
	export let type: string = 'text';
	export let placeholder: string = '';
	export let error: string | null = null;
	export let value: string = '';
	export let required: boolean = false;

	// Input に渡すその他の props
	export let inputProps: HTMLAttributes<HTMLInputElement> = {};
</script>

<div class="flex w-full max-w-sm flex-col gap-1.5">
	{#if label}
		<Label for={id}
			>{label}{#if required}
				<span class="text-red-500">*</span>
			{/if}</Label
		>
	{/if}
	<Input {id} {type} {placeholder} bind:value {...inputProps} class="w-full" />
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
