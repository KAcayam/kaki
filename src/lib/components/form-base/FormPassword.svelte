<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Eye, EyeOff } from 'lucide-svelte';
	import { writable } from 'svelte/store';
	import type { HTMLAttributes } from 'svelte/elements';

	export let id: string;
	export let label: string;
	export let placeholder: string = '';
	export let error: string | null = null;
	export let value: string = '';
	export let required: boolean = false;

	// Input に渡すその他の props
	export let inputProps: HTMLAttributes<HTMLInputElement> = {};

	// パスワード表示切替
	const showPassword = writable(false);
	$: type = $showPassword ? 'text' : 'password';

	function toggleShow() {
		showPassword.update((v) => !v);
	}
</script>

<div class="relative flex w-full max-w-sm flex-col gap-1.5">
	{#if label}
		<Label for={id}
			>{label}{#if required}
				<span class="text-red-500">*</span>
			{/if}</Label
		>
	{/if}

	<div class="relative w-full">
		<Input {id} {type} {placeholder} bind:value {...inputProps} class="w-full pr-10" />
		<!-- Eye アイコン -->
		<button
			type="button"
			onclick={toggleShow}
			class="absolute inset-y-0 right-2 flex items-center justify-center text-gray-400 hover:text-gray-600"
			tabindex="-1"
		>
			{#if $showPassword}
				<EyeOff class="h-5 w-5" />
			{:else}
				<Eye class="h-5 w-5" />
			{/if}
		</button>
	</div>

	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
