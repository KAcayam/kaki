<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import CartItemCard from './CartItemCard.svelte';
	import CartSummary from './CartSummary.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';

	export const pageTitle = 'カート';

	// カートアイテムの型定義
	type CartItem = {
		id: string;
		title: string;
		variant: string;
		price: number;
		quantity: number;
		img: string | null;
		type: 'with-shell' | 'no-shell' | 'no-image' | 'login-required';
	};

	let currentStepperIndex: number = $state(0);

	// カートデータのサンプルを data.json から取得して構築
	// 実際にはユーザーのカート情報をDBやセッションから取得するロジックになる
	let items: CartItem[] = $state([
		{
			id: 'oyster-001',
			title: data.products.find((p) => p.id === 'oyster-001')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-001')?.type === 'with-shell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-001')?.price || 0,
			quantity: 1,
			img: data.products.find((p) => p.id === 'oyster-001')?.image || null,
			type: (data.products.find((p) => p.id === 'oyster-001')?.type ||
				'no-image') as CartItem['type']
		},
		{
			id: 'oyster-005',
			title: data.products.find((p) => p.id === 'oyster-005')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-005')?.type === 'with-shell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-005')?.price || 0,
			quantity: 4,
			img: data.products.find((p) => p.id === 'oyster-005')?.image || null,
			type: (data.products.find((p) => p.id === 'oyster-005')?.type ||
				'no-image') as CartItem['type']
		},
		{
			id: 'oyster-003',
			title: data.products.find((p) => p.id === 'oyster-003')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-003')?.type === 'with-shell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-003')?.price || 0,
			quantity: 2,
			img: data.products.find((p) => p.id === 'oyster-003')?.image || null,
			type: (data.products.find((p) => p.id === 'oyster-003')?.type ||
				'no-image') as CartItem['type']
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
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-4">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">TOPに戻る</span>
			</a>
		</div>

		<div class="mx-auto mb-4 w-full max-w-4xl px-8">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-2 ml-8 flex flex-row items-center gap-8 md:mb-4">
			<div class="text-md md:text-xl">{pageTitle}</div>
		</div>

		<div class="mx-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
			<!-- LEFT/カート内商品カラム -->
			<section>
				{#each items as item (item.id)}
					<div class="mb-4">
						<CartItemCard {item} onRemove={removeItem} onChangeQuantity={changeQty} />
					</div>
				{/each}
			</section>

			<!-- RIGHT/合計金額・購入手続きカラム -->
			<CartSummary {items} />
		</div>
	</div>
</div>
