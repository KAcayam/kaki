<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import SelectCalendar from '$lib/components/ui/SelectCalendar.svelte';
	import AddtoCartModal from './AddtoCart.svelte';

	interface Product {
		id: string; // <-- ここを追加
		name: string; // <-- ここを追加
		price: number;
		inStock: boolean;
	}

	let {
		product,
		productType = 'withShell'
	}: {
		product: Product;
		productType?: 'withShell' | 'noShell' | 'noImage' | 'loginRequired' | 'generic'; // <-- ここを修正
	} = $props();

	// 数量の選択肢を生成
	const quantities = Array.from({ length: 10 }, (_, i) => i + 1); // lengthで最大選択数を設定
	let selectedQuantity = $state<string>('1');
	const triggerContent = $derived(selectedQuantity);

	// サンプル表示の際の例　運用時はデータによってproductTypeを設定
	const priceUnit = $derived(
		productType === 'withShell' || productType === 'noImage'
			? '1kgあたり'
			: productType === 'noShell'
				? '1パック(500g)あたり'
				: undefined // どの条件にも合致しない場合は undefined
	);

	const quantityLabel = $derived(
		productType === 'withShell' || productType === 'noImage'
			? '数量 (kg)'
			: productType === 'noShell'
				? '数量 (パック)'
				: undefined
	);

	const quantitySuffix = $derived(
		productType === 'withShell' || productType === 'noImage'
			? 'kg'
			: productType === 'noShell'
				? 'パック'
				: undefined
	);

	// モーダルの表示状態を管理するステート
	let showAddedToCartModal = $state(false);

	// カートに追加する処理（実際にはAPIコールなどを行う）
	function handleAddToCart() {
		// ここでカートに商品を追加するロジックを実装します
		// 例: カートに product.id, product.name, product.price, selectedQuantity などを追加
		console.log(
			`カートに商品を追加: ${product.name} (ID: ${product.id}), 数量: ${selectedQuantity}`
		);

		// 処理が完了したらモーダルを表示
		showAddedToCartModal = true;
	}

	// モーダルから「支払いへ進む」コールバックを受け取った時のハンドラ
	function handleProceedToCheckoutCallback() {
		console.log('支払いへ進むコールバックが呼ばれました (子コンポーネントが遷移します)');
		showAddedToCartModal = false;
	}

	// モーダルから「買い物を続ける」コールバックを受け取った時のハンドラ
	function handleContinueShoppingCallback() {
		console.log('買い物を続けるコールバックが呼ばれました (子コンポーネントが遷移します)');
		showAddedToCartModal = false;
	}

	// モーダル自身の閉じる操作
	function handleModalOpenChangeCallback(newOpen: boolean) {
		showAddedToCartModal = newOpen;
	}
</script>

<div class="flex flex-col">
	<div class="max-w-xs rounded-lg border p-4">
		<div class="mb-4">
			<p class="text-sm text-muted-foreground">{priceUnit}</p>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-medium">{product.price.toLocaleString()}</span>
				<span class="text-lg">円</span>
				<span class="ml-2 text-sm text-muted-foreground">税込</span>
			</div>
			<div class="mt-2 text-sm text-gray-700">
				在庫：
				{#if product.inStock}
					<span class="font-semibold text-green-600">◯</span>
				{:else}
					<span class="font-semibold text-red-600">在庫なし</span>
				{/if}
			</div>
		</div>

		<div class="mb-6 space-y-2 text-sm text-muted-foreground">
			<SelectCalendar />
			<p>
				お届け予定日： <span class="text-gray-700">通常2〜6日後にお届け</span>
			</p>
			<p class="text-xs">※ 出荷不可日、一部離島は除く</p>
			<p class="text-xs">※ 出荷は支払い確認後となります</p>
		</div>

		<div class="mb-6">
			<div class="flex items-center gap-2">
				<Select.Root type="single" name="quantity" bind:value={selectedQuantity}>
					<Select.Trigger class="w-20 cursor-pointer">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>{quantityLabel}</Select.Label>
							{#each quantities as quantity (quantity)}
								<Select.Item value={quantity.toString()} label={quantity.toString()}>
									{quantity}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
				<span class="text-sm text-muted-foreground">{quantitySuffix}</span>
			</div>
		</div>

		<div>
			<Button
				type="button"
				class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600"
				onclick={handleAddToCart}
			>
				カートに入れる
			</Button>
		</div>

		<!-- モーダル -->
		<AddtoCartModal
			open={showAddedToCartModal}
			onProceedToCheckout={handleProceedToCheckoutCallback}
			onContinueShopping={handleContinueShoppingCallback}
			onOpenChange={handleModalOpenChangeCallback}
		/>
	</div>
</div>