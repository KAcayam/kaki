<script lang="ts">
	import { CircleQuestionMark } from 'lucide-svelte';

	interface ProductData {
		id: string;
		name: string;
		price?: number;
		image?: string;
		isLoggedInRequired?: boolean;
		type?: string;
	}

	let { product }: { product: ProductData } = $props();

	const showLoginRequired = $derived(product.isLoggedInRequired);

	// 遷移先のURLを動的に生成
	const detailPageHref = $derived(
		product.type ? `/product/${product.type}?id=${product.id}` : '#' // typeがない場合は遷移なし（#）
	);
</script>

<div class="flex w-full flex-col items-start">
	<!-- 商品写真エリア -->
	<div
		class="relative mb-2 block aspect-[4/3] w-full overflow-hidden rounded border border-gray-300 bg-gray-50"
	>
		{#if showLoginRequired}
			<div
				class="absolute inset-0 flex flex-col items-center justify-center p-2 text-center text-gray-300"
			>
				<CircleQuestionMark class="mb-2 h-16 w-16" />
				<span class="">ログインが必要です</span>
			</div>
		{:else}
			<!-- showLoginRequiredでない場合は常に<a>タグでラップ -->
			<a href={detailPageHref} class="block h-full w-full">
				{#if product.image}
					<img
						src={product.image}
						alt={product.name}
						class="absolute inset-0 h-full w-full object-contain"
					/>
				{:else}
					<!-- 画像なし表示 -->
					<div
						class="absolute inset-0 flex h-full w-full items-center justify-center text-gray-500"
					>
						画像なし
					</div>
				{/if}
			</a>
		{/if}
	</div>

	<!-- 商品名と価格 -->
	<div class="flex flex-col">
		{#if showLoginRequired}
			<p class="text-lg text-gray-600">ログインが必要です</p>
		{:else}
			<p class="text-lg">{product.name}</p>
			{#if product.price !== undefined}
				<p class="text-lg">{product.price.toLocaleString()}円~</p>
			{/if}
		{/if}
	</div>
</div>
