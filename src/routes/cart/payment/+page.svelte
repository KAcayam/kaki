<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';
	import PaymentCard from './PaymentCard.svelte';
	import OrderDetails from './OrderDetails.svelte';
	import { goto } from '$app/navigation';
	import type { CartItem, ProductType } from '$lib/types';

	export const pageTitle = 'お支払い方法';
	let currentStepperIndex = $state(3);

	// サンプルデータを生成
	// cart/+page.svelteと同様のサンプルデータを生成
	let cartItems: CartItem[] = $state([
		{
			id: 'oyster-001',
			title: data.products.find((p) => p.id === 'oyster-001')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-001')?.type === 'withShell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-001')?.price || 0,
			quantity: 1,
			img: data.products.find((p) => p.id === 'oyster-001')?.image || null,
			type: data.products.find((p) => p.id === 'oyster-001')?.type as ProductType
		},
		{
			id: 'oyster-005',
			title: data.products.find((p) => p.id === 'oyster-005')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-005')?.type === 'withShell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-005')?.price || 0,
			quantity: 4,
			img: data.products.find((p) => p.id === 'oyster-005')?.image || null,
			type: data.products.find((p) => p.id === 'oyster-005')?.type as ProductType
		},
		{
			id: 'oyster-003',
			title: data.products.find((p) => p.id === 'oyster-003')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-003')?.type === 'withShell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-003')?.price || 0,
			quantity: 2,
			img: data.products.find((p) => p.id === 'oyster-003')?.image || null,
			type: data.products.find((p) => p.id === 'oyster-003')?.type as ProductType
		}
	]);

	// 金額計算
	const subtotal = $derived(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
	const shippingCost = 880;
	const total = $derived(subtotal + shippingCost);

	let { backToCart = '/cart' } = $props<{ backToCart?: string }>();
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col justify-center pt-4 md:mx-8">
		<div class="mb-4 self-start">
			<a
				href="/cart/shipping-information"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<div class="text-xs md:text-sm">前に戻る</div>
			</a>
		</div>

		<div class="mx-auto mb-4 w-full max-w-4xl md:max-w-2xl">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-2 flex flex-row items-center md:mb-4">
			<div class="text-base md:text-xl">{pageTitle}</div>
		</div>

		<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
			<div class="mx-auto w-full max-w-sm">
				<OrderDetails {cartItems} {subtotal} {shippingCost} {total} />
			</div>
			<div class="mx-auto w-full max-w-sm">
				<PaymentCard />

				<div class="mx-auto flex w-72 flex-col pt-4">
					<Button
						onclick={() => goto(backToCart)}
						class="w-full cursor-pointer text-gray-600 hover:text-gray-700"
						variant="outline">カートに戻る</Button
					>
				</div>
			</div>
		</div>
	</div>
</div>
