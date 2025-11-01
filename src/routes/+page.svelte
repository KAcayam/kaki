<script lang="ts">
	import SelectCalendar from '$lib/components/ui/SelectCalendar.svelte';
	import ProductCard from './ProductCard.svelte';
	import data from '$lib/data.json'; // data.jsonをインポート

	// JSONのproducts配列に合わせた型定義
	interface Product {
		id: string;
		name: string;
		price: number;
		image: string | null; // 画像パスは文字列またはnull
		type: string;
		isLoggedInRequired?: boolean;
	}

	// data.jsonから商品データを取得
	const products: Product[] = data.products;
</script>

<main class="flex w-full flex-col items-center">
	<!-- タイトル・ロゴ -->
	<section class="mt-8 mb-4 flex w-full flex-col items-center">
		<div class="flex flex-col items-center">
			<div class="flex items-center gap-4">
				<div class="mb-2 flex h-16 w-40 items-center justify-center rounded bg-gray-300">
					<span class="text-2xl font-bold text-white">ロゴなど</span>
				</div>
				<h1 class="mb-2 text-4xl">新鮮な牡蠣販売所</h1>
			</div>
			<div class="max-w-xl text-center text-gray-500">
				新鮮な牡蠣を産地から直接お届けします。期間限定の旬の味をお楽しみください。
			</div>
		</div>
	</section>
	<div class="w-full max-w-screen-2xl px-8">
		<!-- カレンダー -->
		<div class="mb-4 flex w-full justify-end">
			<SelectCalendar />
		</div>

		<!-- 商品パネル -->
		<section
			class="mb-8 grid w-full grid-cols-2 justify-between gap-6 md:grid-cols-3 xl:grid-cols-4"
		>
			{#each products as product (product.id)}
				<div class="w-full">
					<ProductCard {product} />
				</div>
			{/each}
		</section>
	</div>
</main>