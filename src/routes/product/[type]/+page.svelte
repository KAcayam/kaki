<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronLeft } from 'lucide-svelte';
	import ProductImageGallery from './ProductImageGallery.svelte';
	import ProductPurchase from './ProductPurchase.svelte';
	import data from '$lib/data.json';

	export const pageTitle = '商品詳細';

	interface Product {
		id: string;
		name: string;
		price: number;
		image: string | null;
		type: string;
		inStock: boolean;
		description: string;
		detailImages: string[];
		isLoggedInRequired?: boolean;
		defaultVariant?: string;
	}

	// URLからidクエリパラメータを取得
	const productId = $page.url.searchParams.get('id');

	// data.jsonから該当する商品データを検索
	const productData: Product | undefined = data.products.find((p) => p.id === productId);

	if (!productData) {
		console.error(`Product with ID ${productId} not found.`);
	}

	// productData が undefined の場合のフォールバック用ダミーデータ（開発用）
	const fallbackProductData: Product = {
		id: 'dummy',
		name: '商品が見つかりません',
		price: 0,
		image: null,
		type: 'no-image',
		inStock: false,
		description: 'お探しの商品は見つかりませんでした。',
		detailImages: []
	};

	const displayProductData = productData || fallbackProductData;

	const productType: 'withShell' | 'noShell' | 'noImage' | 'loginRequired' | 'generic' =
		displayProductData.type === 'no-shell'
			? 'noShell'
			: displayProductData.type === 'no-image'
				? 'noImage'
				: displayProductData.type === 'login-required'
					? 'loginRequired'
					: 'withShell';

	// ProductPurchase コンポーネントに渡すデータ
	const productForPurchasePanel = {
		id: displayProductData.id,
		name: displayProductData.name,
		price: displayProductData.price,
		inStock: displayProductData.inStock
	};
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">TOPに戻る</span>
			</a>
		</div>

		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-xl">{displayProductData.name}</div>
		</div>

		<div class="mx-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
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
