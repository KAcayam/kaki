<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';
	import PaymentCard from './PaymentCard.svelte';
	import OrderDetails from './OrderDetails.svelte';
	import { goto } from '$app/navigation';

	export const pageTitle = 'お支払い方法';
	let currentStepperIndex = $state(3);

	// カートアイテムの型定義
	type CartItem = {
		id: string;
		title: string;
		variant: string;
		price: number;
		quantity: number;
		img: string | null;
	};

	// サンプルデータを生成
	// cart/+page.svelteと同様のサンプルデータを生成
	let cartItems: CartItem[] = $state([
		{
			id: 'oyster-001',
			title: data.products.find((p) => p.id === 'oyster-001')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-001')?.type === 'with-shell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-001')?.price || 0,
			quantity: 1,
			img: data.products.find((p) => p.id === 'oyster-001')?.image || null
		},
		{
			id: 'oyster-005',
			title: data.products.find((p) => p.id === 'oyster-005')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-005')?.type === 'with-shell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-005')?.price || 0,
			quantity: 4,
			img: data.products.find((p) => p.id === 'oyster-005')?.image || null
		},
		{
			id: 'oyster-003',
			title: data.products.find((p) => p.id === 'oyster-003')?.name || '不明な商品',
			variant:
				data.products.find((p) => p.id === 'oyster-003')?.type === 'with-shell' ? 'kg' : 'パック', // typeに基づいてvariantを設定
			price: data.products.find((p) => p.id === 'oyster-003')?.price || 0,
			quantity: 2,
			img: data.products.find((p) => p.id === 'oyster-003')?.image || null
		}
	]);

	// 金額計算
	const subtotal = $derived(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
	const shippingCost = 880;
	const total = $derived(subtotal + shippingCost);

	// 金額をフォーマットするヘルパー
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount);
	};

	let { backToCart = '/cart' } = $props<{ backToCart?: string }>();
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-4">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/cart/shipping-information"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">前に戻る</span>
			</a>
		</div>

		<div class="mx-auto mb-4 w-full max-w-4xl px-8">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-2 ml-8 flex flex-row items-center md:mb-4">
			<div class="text-md md:text-xl">{pageTitle}</div>
		</div>

		<div class="mx-auto grid w-full max-w-3xl grid-cols-1 gap-4 px-8 md:grid-cols-2">
			<div class="mx-auto w-full max-w-sm">
				<OrderDetails {cartItems} {subtotal} {shippingCost} {total} {formatCurrency} />
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
