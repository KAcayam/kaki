<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronLeft } from 'lucide-svelte';
	import ProductImageGallery from '$lib/components/panel/ProductImageGallery.svelte';
	import ProductPurchase from '$lib/components/panel/ProductPurchase.svelte';
	import data from '$lib/data.json'; // data.jsonをインポート

	export const pageTitle = '商品詳細';

	// JSONのproducts配列に合わせた型定義 (defaultVariantの型を修正)
	interface Product {
		id: string;
		name: string;
		price: number;
		image: string | null;
		type: string;
		inStock: boolean;
		description: string;
		detailImages: string[]; // 詳細ギャラリー用の画像パス
		isLoggedInRequired?: boolean;
		defaultVariant?: string; // <-- ここを修正: 'kg' | '個' | 'パック' ではなく string に変更
	}

	// URLからidクエリパラメータを取得
	const productId = $page.url.searchParams.get('id');

	// data.jsonから該当する商品データを検索
	const productData: Product | undefined = data.products.find((p) => p.id === productId);

	// 商品データが見つからない場合のフォールバック（例: 404ページへのリダイレクトなど、運用時に実装）
	// ここでは簡単のためにダミーデータを定義しますが、実際はエラーハンドリングが必要です。
	if (!productData) {
		// 例えば、エラーページにリダイレクトする
		// import { goto } from '$app/navigation';
		// goto('/404');
		// または、SvelteKitのload関数で404を返す
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

	// 実際の表示に使用する商品データ (見つからない場合はフォールバックを使用)
	const displayProductData = productData || fallbackProductData;

	// productType の定義は引き続きURLのtypeパラメータから行うが、主に表示ロジックのため
	// data.jsonの商品オブジェクトのtypeプロパティを使用するとより一貫性がある
	// 現在のロジックを維持するため、既存の productType 変数を残します。
	const productType: 'withShell' | 'noShell' | 'noImage' | 'loginRequired' | 'generic' =
		displayProductData.type === 'no-shell'
			? 'noShell'
			: displayProductData.type === 'no-image'
				? 'noImage'
				: displayProductData.type === 'login-required'
					? 'loginRequired'
					: 'withShell'; // デフォルトは 'withShell' と仮定

	// ProductPurchase コンポーネントに渡すデータ
	const productForPurchasePanel = {
		id: displayProductData.id, // IDも渡すようにする
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
