<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import CartItemCard from '$lib/components/panel/CartItemCard.svelte';
	import CartSummary from '$lib/components/panel/CartSummary.svelte';
	import { ChevronLeft } from 'lucide-svelte';

	export const pageTitle = 'カート';

	import Kaki1 from '$lib/images/sample/kaki1.png';
	import Kaki3 from '$lib/images/sample/kaki3.jpg';
	import muki1 from '$lib/images/sample/muki1.jpg';

	let currentStepperIndex: number = $state(0);

	// カートデータの静的サンプル
	type CartItem = {
		id: string;
		title: string;
		variant: 'kg' | '個' | 'パック';
		price: number;
		quantity: number;
		img: string;
	};

	let items: CartItem[] = $state([
		{
			id: '1',
			title: '殻付き生牡蠣',
			variant: '個',
			price: 4800,
			quantity: 1,
			img: Kaki1
		},
		{
			id: '2',
			title: '生牡蠣 むき身',
			variant: 'パック',
			price: 2800,
			quantity: 4,
			img: muki1
		},
		{
			id: '3',
			title: '殻付き生牡蠣',
			variant: '個',
			price: 5500,
			quantity: 2,
			img: Kaki3
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
			<a href="/">
				<button
					class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
				>
					<ChevronLeft class="h-4 w-4 text-gray-600" />
					<span class="text-sm">TOPに戻る</span>
				</button>
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
