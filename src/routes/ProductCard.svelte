<script lang="ts">
	import { CircleQuestionMark } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	interface ProductData {
		id: string;
		name: string;
		price?: number;
		image?: string | null;
		isLoggedInRequired?: boolean;
		type?: string;
	}

	let { product }: { product: ProductData } = $props();

	const showLoginRequired = $derived(product.isLoggedInRequired);

	// 遷移先のURLを動的に生成
	const detailPageHref = $derived(
		product.type ? `/product/${product.type}?id=${product.id}` : '#' // typeがない場合は遷移なし（#）
	);

	const navigate = () => {
		if (!showLoginRequired && product.type) {
			goto(detailPageHref);
		}
	};
</script>

<button
	type="button"
	onclick={navigate}
	class="m-0 flex w-full appearance-none flex-col items-start border-0 bg-transparent p-0 text-left"
>
	<!-- 商品写真エリア -->
	<div
		class="relative mb-2 block aspect-[4/3] w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50"
	>
		{#if showLoginRequired}
			<div
				class="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-gray-300"
			>
				<CircleQuestionMark class="mb-2 h-16 w-16" />
				<span class="lg:text-md text-sm">ログインが必要です</span>
			</div>
		{:else if product.image}
			<img
				src={product.image}
				alt={product.name}
				class="absolute inset-0 h-full w-full cursor-pointer object-contain"
			/>
		{:else}
			<!-- 画像なし表示 -->
			<div
				class="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center text-gray-500"
			>
				画像なし
			</div>
		{/if}
	</div>

	<!-- 商品名と価格 -->
	<div class="mx-auto flex flex-col items-center">
		{#if showLoginRequired}
			<div class="text-sm text-gray-600 lg:text-lg">ログインすると商品が閲覧できます</div>
		{:else}
			<div class="text-sm md:text-sm lg:text-lg">{product.name}</div>
			{#if product.price !== undefined}
				<div class="text-sm md:text-sm lg:text-lg">{product.price.toLocaleString()}円~</div>
			{/if}
		{/if}
	</div>
</button>
