<script lang="ts">
	import { CircleQuestionMark } from 'lucide-svelte';

	interface ProductData {
		id: string;
		name: string;
		price?: number;
		image?: string;
		isLoggedInRequired?: boolean;
	}

	let { product }: { product: ProductData } = $props();

	const showLoginRequired = $derived(product.isLoggedInRequired);
</script>

<div class="flex w-full flex-col items-start">
	<!-- 商品写真（またはログイン必須アイコン＋メッセージ）エリア -->
	<!-- block要素として扱い、aspect-[4/3]でアスペクト比を固定 -->
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
			<a href="/detail-shell" class="block h-full w-full">
				{#if product.image}
					<img
						src={product.image}
						alt={product.name}
						class="absolute inset-0 h-full w-full object-contain"
					/>
				{:else}
					<div
						class="absolute inset-0 flex h-full w-full items-center justify-center text-gray-500"
					>
						画像なし
					</div>
				{/if}
			</a>
		{/if}
	</div>

	<!-- 商品名と価格（またはログイン必須メッセージ）エリア -->
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
