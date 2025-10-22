<script lang="ts">
	import { page } from '$app/stores';
	import { ChevronLeft } from 'lucide-svelte';
	import ProductImageGallery from '$lib/components/detail/ProductImageGallery.svelte';
	import ProductPurchasePanel from '$lib/components/detail/ProductPurchasePanel.svelte';

	// サンプル画像パス
	import kaki1 from '$lib/images/sample/kaki1.png';
	import kaki2 from '$lib/images/sample/kaki2.jpeg';
	import kaki3 from '$lib/images/sample/kaki3.jpg';
	import muki1 from '$lib/images/sample/muki1.jpg';
	import muki2 from '$lib/images/sample/muki2.jpg';

	// 運用時はこの表示切り替えロジックも変更
	const productType: 'withShell' | 'noShell' | 'noImage' =
		$page.params.type === 'no-shell'
			? 'noShell'
			: $page.params.type === 'no-image'
				? 'noImage'
				: 'withShell';

	// 運用時はDBやAPIから取得
	const productData = (() => {
		switch (productType) {
			case 'withShell':
				return {
					name: '殻付き生牡蠣',
					price: 4800,
					inStock: true,
					description:
						'・販売は1kg単位になります。自然のものなので多少の前後があることをご理解ください。',
					images: [kaki1, kaki2, kaki3]
				};
			case 'noShell':
				return {
					name: '生牡蠣 むき身',
					price: 2800,
					inStock: false,
					description:
						'・1パックはおよそ500gとなります。自然のものなので多少の前後があることをご理解ください。',
					images: [muki1, muki2]
				};
			case 'noImage':
				return {
					name: '【画像なし】殻付き生牡蠣',
					price: 3500,
					inStock: true,
					description: '・こちらは現在未入荷のため画像がまだありません。',
					images: []
				};
		}
	})();

	const productForPurchasePanel = {
		name: productData.name,
		price: productData.price,
		inStock: productData.inStock
	};
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mb-4 ml-8 self-start">
			<a href="/">
				<button
					class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
				>
					<ChevronLeft class="h-4 w-4 text-gray-600" />
					<span class="text-sm">TOPに戻る</span>
				</button>
			</a>
		</div>

		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-2xl">{productData.name}</div>
		</div>

		<div class="mx-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- LEFT/画像・注釈カラム -->
			<div>
				<ProductImageGallery images={productData.images} />
				<div class="mt-2 text-sm text-muted-foreground">
					<p>{productData.description}</p>
					<p>・その他注意書きがあるときもこちらに記載する</p>
				</div>
			</div>

			<!-- RIGHT/商品情報カラム -->
			<ProductPurchasePanel product={productForPurchasePanel} {productType} />
		</div>
	</div>
</div>
