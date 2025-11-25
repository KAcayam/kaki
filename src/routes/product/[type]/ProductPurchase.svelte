<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import SelectCalendar from '$lib/components/ui/SelectCalendar.svelte';
	import type { Product, ProductType } from '$lib/types';
	import AddToCart from './AddToCart.svelte';

	let {
		product,
		productType = 'withShell'
	}: {
		product: Product;
		productType?: ProductType;
	} = $props();

	// 数量の選択肢
	const quantities = Array.from({ length: 10 }, (_, i) => i + 1);
	let selectedQuantity = $state<string>('1');
	const triggerContent = $derived(selectedQuantity);

	const priceUnit = $derived(
		productType === 'withShell' || productType === 'noImage'
			? '1kgあたり'
			: productType === 'noShell'
				? '1パック(500g)あたり'
				: undefined
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

	// モーダル表示
	let showAddedToCartModal = $state(false);

	// カートに追加
	function handleAddToCart() {
		console.log(
			`カートに商品を追加: ${product.name} (ID: ${product.id}), 数量: ${selectedQuantity}`
		);
		showAddedToCartModal = true;
	}

	function handleProceedToCheckoutCallback() {
		showAddedToCartModal = false;
	}

	function handleContinueShoppingCallback() {
		showAddedToCartModal = false;
	}

	function handleModalOpenChange(newOpen: boolean) {
		showAddedToCartModal = newOpen;
	}
</script>

<div class="flex flex-col">
	<div class="max-w-sm rounded-lg border p-4 md:max-w-xs">
		<div class="mb-4">
			<p class="text-sm text-muted-foreground">{priceUnit}</p>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-medium">{product.price.toLocaleString()}</span>
				<span class="text-base md:text-lg">円</span>
				<span class="text-xs text-muted-foreground md:text-sm">税込</span>
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

		<div class="mb-4 space-y-2 text-sm text-muted-foreground">
			<SelectCalendar />
			<p>
				お届け予定日： <span class="text-gray-700">通常2〜6日後にお届け</span>
			</p>
			<div class="text-xs leading-[0.5]">※ 出荷不可日、一部離島は除く</div>
			<div class="text-xs">※ 出荷は支払い確認後となります</div>
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
				class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 md:w-72"
				onclick={handleAddToCart}
			>
				カートに入れる
			</Button>
		</div>

		<!-- モーダルAddtoCartコンポーネント -->
		<AddToCart
			bind:open={showAddedToCartModal}
			onOpenChange={handleModalOpenChange}
			onProceedToCheckout={handleProceedToCheckoutCallback}
			onContinueShopping={handleContinueShoppingCallback}
		/>
	</div>
</div>
