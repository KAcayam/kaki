<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { isLoggedIn } from '$lib/stores/auth'; // ストアをインポート

	type ChildrenProps = {
		isLoggedIn: boolean; // これはchildrenスロットに渡すための型定義。実データはストアから
		pageTitle: string;
	};

	type LayoutComponentProps = {
		data?: {
			title?: string;
		};
		// isLoggedIn はストアから取得するため、ここでプロパティとして受け取る必要がなくなる
		children: Snippet<[ChildrenProps]>;
	};

	// isLoggedIn はストアから取得するため、propsから削除
	let { data, children }: LayoutComponentProps = $props();

	let pageTitle = $derived(data?.title || 'お客様情報');
	let currentStepperIndex = $state(1);
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mb-4 ml-8 self-start">
			<a href="/cart">
				<button
					class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
				>
					<ChevronLeft class="h-4 w-4 text-gray-600" />
					<span class="text-sm">カートに戻る</span>
				</button>
			</a>
		</div>

		<div class="mx-auto mb-8 w-full max-w-4xl px-8">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-xl">{pageTitle}</div>
		</div>

		<!-- children に渡す isLoggedIn はストアの値を使用 -->
		{@render children({ isLoggedIn: $isLoggedIn, pageTitle })}
	</div>
</div>
