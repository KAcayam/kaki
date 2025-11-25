<script lang="ts">
	import { page } from '$app/state';
	import { ChevronLeft } from 'lucide-svelte';
	import ProductImageGallery from './ProductImageGallery.svelte';
	import ProductPurchase from './ProductPurchase.svelte';
	import data from '$lib/data.json';
	import type { Product, ProductType } from '$lib/types';

	export const pageTitle = '商品詳細';

	// URLからidクエリパラメータを取得
	const productId = page.url.searchParams.get('id');

	// data.jsonから該当する商品データを検索
	const productData: Product | undefined = (data.products as Product[]).find(
		(p) => p.id === productId
	);

	if (!productData) {
		console.error(`Product with ID ${productId} not found.`);
	}

	// productData が undefined の場合のフォールバック用ダミーデータ（開発用）
	const fallbackProductData: Product = {
		id: 'dummy',
		name: '商品が見つかりません',
		price: 0,
		image: null,
		type: 'noImage',
		inStock: false,
		description: 'お探しの商品は見つかりませんでした。',
		detailImages: []
	};

	const displayProductData = productData || fallbackProductData;

	const productType: ProductType = displayProductData.type;

	const productForPurchasePanel: Product = displayProductData;
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col justify-center pt-4 md:mx-8">
		<div class="mb-2 self-start md:mb-4">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<div class="text-xs md:text-sm">TOPに戻る</div>
			</a>
		</div>

		<div class="mb-2 flex flex-row items-center gap-8 md:mb-4">
			<div class="text-lg md:text-xl">{displayProductData.name}</div>
		</div>

		<div class=" grid grid-cols-1 gap-4 md:grid-cols-2">
			<!-- LEFT/画像・注釈カラム -->
			<div class="rounded-lg border border-gray-200 p-4">
				<ProductImageGallery images={displayProductData.detailImages} />
				<div class="mt-2 text-sm text-muted-foreground">
					<p>{displayProductData.description}</p>
					<p>・その他注意書きがあるときもこちらに記載する</p>
				</div>
			</div>

			<!-- RIGHT/商品情報カラム -->
			<div>
				<ProductPurchase product={productForPurchasePanel} {productType} />
			</div>
		</div>
	</div>
</div>
