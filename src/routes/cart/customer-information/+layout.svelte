<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { isLoggedIn } from '$lib/stores/auth';

	type ChildrenProps = {
		isLoggedIn: boolean;
		pageTitle: string;
	};

	type LayoutComponentProps = {
		data?: {
			title?: string;
		};
		children: Snippet<[ChildrenProps]>;
	};

	let { data, children }: LayoutComponentProps = $props();

	let pageTitle = $derived(data?.title || 'お客様情報');
	let currentStepperIndex = $state(1);
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-4">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/cart"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">カートに戻る</span>
			</a>
		</div>

		<div class="mx-auto mb-4 w-full max-w-4xl px-8">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-2 ml-8 flex flex-row items-center gap-8 md:mb-4">
			<div class="text-md md:text-xl">{pageTitle}</div>
		</div>

		{@render children({ isLoggedIn: $isLoggedIn, pageTitle })}
	</div>
</div>
