<script lang="ts">
	import SelectCalendar from '$lib/components/ui/SelectCalendar.svelte';
	import ProductCard from './ProductCard.svelte';
	import data from '$lib/data.json';
	import type { Product } from '$lib/types';

	// data.jsonから商品データを取得
	const products: Product[] = data.products as Product[];
</script>

<main class="flex w-full flex-col items-center">
	<!-- タイトル・ロゴ -->
	<section class="mt-4 mb-4 flex w-full flex-col items-center md:mt-8">
		<div class="flex flex-col items-center sm:flex-row sm:items-center sm:gap-4">
			<div class="mb-2 flex h-16 w-40 items-center justify-center rounded bg-gray-300 sm:mb-0">
				<span class="text-2xl font-bold text-white">ロゴなど</span>
			</div>
			<h1 class="text-2xl lg:text-4xl">新鮮な牡蠣販売所</h1>
		</div>
		<div class="mt-2 max-w-xl px-8 text-start text-xs text-gray-500 md:text-base">
			新鮮な牡蠣を産地から直接お届けします。期間限定の旬の味をお楽しみください。
		</div>
	</section>
	<div class="w-full max-w-screen-2xl px-4 md:px-8">
		<!-- カレンダー -->
		<div class="mb-4 flex w-full justify-end">
			<SelectCalendar />
		</div>

		<!-- 商品パネル -->
		<section class="grid w-full grid-cols-2 justify-between gap-6 md:grid-cols-3 xl:grid-cols-4">
			{#each products as product (product.id)}
				<div class="w-full">
					<ProductCard {product} />
				</div>
			{/each}
		</section>
	</div>
</main>
