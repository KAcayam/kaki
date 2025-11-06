<script lang="ts">
	import { Check } from 'lucide-svelte';

	let {
		steps = [
			{ label: 'カート確認' },
			{ label: 'お客様情報' },
			{ label: 'ご配送先' },
			{ label: 'お支払い方法' },
			{ label: '完了' }
		],
		currentStepIndex = 0
	}: { steps?: { label: string }[]; currentStepIndex?: number } = $props();

	const getStepStatus = $derived((index: number) => {
		if (index < currentStepIndex) return 'completed';
		if (index === currentStepIndex) return 'current';
		return 'upcoming';
	});

	const lineVerticalOffset = 'mt-[15px]';
</script>

<div class="flex justify-between">
	{#each steps as step, index}
		<!-- ステップ本体 -->
		<div class="relative flex min-w-0 flex-1 flex-col items-center">
			<div
				class="relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium
				{getStepStatus(index) === 'completed'
					? 'bg-muted text-gray-400'
					: getStepStatus(index) === 'current'
						? 'bg-blue-500 text-white'
						: getStepStatus(index) === 'upcoming'
							? 'bg-muted text-gray-400'
							: ''}"
			>
				{#if getStepStatus(index) === 'completed'}
					<Check class="h-4 w-4" />
				{:else}
					{index + 1}
				{/if}
			</div>

			<!-- ステップラベル -->
			<div
				class="mt-2 text-center text-xs whitespace-nowrap sm:text-sm
				{getStepStatus(index) === 'current' ? 'font-semibold text-blue-400' : 'text-gray-300'}"
			>
				{step.label}
			</div>

			<!-- ステップ間を繋ぐ線 -->
			{#if index < steps.length - 1}
				<div
					class="absolute right-[calc(-50%+16px)] left-[calc(50%+16px)] h-0.5 bg-muted
					{lineVerticalOffset}
					z-0"
				></div>
			{/if}
		</div>
	{/each}
</div>
