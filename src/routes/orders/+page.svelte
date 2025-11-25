<script lang="ts">
	import OrderPanel from './OrderPanel.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';
	import type { OrderStatus, Order, ProductType } from '$lib/types';

	export const pageTitle = '注文履歴一覧';

	// data.json から商品情報を取得し、productId をキーにしたマップを作成
	const productMap = new Map(data.products.map((p) => [p.id, p]));

	// data.json から注文履歴を取得し、OrderPanel が期待する形式に変換
	const orders: Order[] = (data.orders || []).map((order) => {
		const typedstatus: OrderStatus = order.status as OrderStatus;
		return {
			id: order.id,
			orderDate: order.date,
			orderNumber: order.id,
			totalAmount: order.total,
			status: typedstatus,
			subtotal: order.subtotal ?? 0,
			shippingCost: order.shippingCost ?? 0,
			products: order.items.map((item) => {
				const product = productMap.get(item.productId);
				return {
					id: item.productId,
					name: product?.name ?? '商品が見つかりません',
					price: item.price,
					image: product?.image ?? null,
					type: (product?.type ?? 'generic') as ProductType,
					inStock: product?.inStock ?? true,
					description: product?.description ?? '',
					detailImages: product?.detailImages ?? []
				};
			})
		};
	});
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col justify-center pt-4 md:mx-8">
		<div class="mb-2 self-start md:mb-4">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<div class="text-xs md:text-sm">TOPに戻る</div>
			</a>
		</div>
		<div class="mb-2 flex flex-row items-center md:mb-4">
			<div class="text-base md:text-xl">{pageTitle}</div>
		</div>

		<div class="flex w-full flex-col items-center">
			<div class="flex w-full max-w-2xl flex-col">
				{#if orders.length === 0}
					<p class="text-gray-500">注文履歴はありません。</p>
				{:else}
					<div class="flex flex-col gap-6">
						{#each orders as order (order.orderNumber)}
							<OrderPanel {order} />
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
