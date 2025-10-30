<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import CartItemCard from '$lib/components/panel/CartItemCard.svelte';
	import CartSummary from '$lib/components/panel/CartSummary.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json'; // data.jsonをインポート

	export const pageTitle = 'カート';

	// data.jsonの商品型に合わせた基本型を定義
	interface ProductBase {
		id: string;
		name: string;
		price: number;
		image: string | null;
		defaultVariant?: string; // カートでvariantとして使用
	}

	// カートアイテムの型定義
	type CartItem = {
		id: string;
		title: string; // 商品名
		variant: string; // kg, 個, パックなど
		price: number;
		quantity: number;
		img: string | null; // 画像パス
	};

	let currentStepperIndex: number = $state(0);

	// カートデータのサンプルを data.json から取得して構築
	// 実際にはユーザーのカート情報をDBやセッションから取得するロジックになる
	let items: CartItem[] = $state([
		// data.jsonから該当する商品を見つけ、カート固有の情報を付加
		{
			id: 'oyster-001', // data.jsonのIDを使用
			title: data.products.find((p) => p.id === 'oyster-001')?.name || '不明な商品',
			variant: data.products.find((p) => p.id === 'oyster-001')?.defaultVariant || '個',
			price: data.products.find((p) => p.id === 'oyster-001')?.price || 0,
			quantity: 1,
			img: data.products.find((p) => p.id === 'oyster-001')?.image || null
		},
		{
			id: 'oyster-005', // data.jsonのIDを使用
			title: data.products.find((p) => p.id === 'oyster-005')?.name || '不明な商品',
			variant: data.products.find((p) => p.id === 'oyster-005')?.defaultVariant || 'パック',
			price: data.products.find((p) => p.id === 'oyster-005')?.price || 0,
			quantity: 4,
			img: data.products.find((p) => p.id === 'oyster-005')?.image || null
		},
		{
			id: 'oyster-003', // data.jsonのIDを使用
			title: data.products.find((p) => p.id === 'oyster-003')?.name || '不明な商品',
			variant: data.products.find((p) => p.id === 'oyster-003')?.defaultVariant || '個',
			price: data.products.find((p) => p.id === 'oyster-003')?.price || 0,
			quantity: 2,
			img: data.products.find((p) => p.id === 'oyster-003')?.image || null
		}
	]);

	function removeItem(id: string) {
		items = items.filter((i) => i.id !== id);
	}

	function changeQty(id: string, qty: number) {
		items = items.map((it) => (it.id === id ? { ...it, quantity: qty } : it));
	}
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

		<div class="mx-auto mb-8 w-full max-w-4xl px-8">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-xl">{pageTitle}</div>
		</div>

		<div class="mx-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- LEFT/カート内商品カラム -->
			<section>
				{#each items as item (item.id)}
					<div class="mb-6">
						<CartItemCard {item} onRemove={removeItem} onChangeQuantity={changeQty} />
					</div>
				{/each}
			</section>

			<!-- RIGHT/合計金額・購入手続きカラム -->
			<CartSummary {items} />
		</div>
	</div>
</div>
