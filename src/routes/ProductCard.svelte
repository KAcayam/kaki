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

<!-- 外側をbuttonに変更、スタイルリセット -->
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
				<span>ログインが必要です</span>
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
	<div class="flex flex-col">
		{#if showLoginRequired}
			<p class="text-lg text-gray-600">ログインすると商品が閲覧できます</p>
		{:else}
			<p class="text-lg">{product.name}</p>
			{#if product.price !== undefined}
				<p class="text-lg">{product.price.toLocaleString()}円~</p>
			{/if}
		{/if}
	</div>
</button>
