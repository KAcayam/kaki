<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Order } from '$lib/types';
	import { goto } from '$app/navigation';

	// $propsで受け取る
	let { order }: { order: Order } = $props();

	function handleDetail() {
		goto(`/orders/detail?orderId=${order.id}`);
	}
</script>

<div class="mb-4 rounded-lg border p-4">
	<!-- ステータス行 -->
	<div class="mb-2 grid grid-cols-3 gap-2 md:flex md:justify-between">
		<div class="col-span-1 row-start-1 flex flex-col">
			<div class="text-xs text-gray-500 md:text-sm">注文日</div>
			<div class="text-sm md:text-base">{order.orderDate}</div>
		</div>

		<div class="col-span-2 row-start-1 flex flex-col">
			<div class="text-xs text-gray-500 md:text-sm">注文番号</div>
			<div class="text-sm md:text-base">{order.orderNumber}</div>
		</div>

		<div class="col-span-1 row-start-2 flex flex-col">
			<div class="text-xs text-gray-500 md:text-sm">合計金額</div>
			<div class="text-sm md:text-base">
				{order.totalAmount.toLocaleString()}<span class="text-xs text-gray-600 md:text-sm">円</span>
			</div>
		</div>

		<div class="col-span-1 row-start-2 flex flex-col self-center">
			<div class="text-xs md:text-sm">{order.status}</div>
		</div>

		<div class="col-span-1 row-start-2 ml-auto self-center md:ml-0">
			<Button
				class="cursor-pointer text-xs text-gray-600 md:text-sm"
				size="sm"
				variant="outline"
				onclick={handleDetail}
			>
				詳細
			</Button>
		</div>
	</div>

	<!-- 商品 -->
	<div class="mt-4 space-y-2">
		{#each order.products as product}
			<div class="flex items-start gap-4 border-t pt-2">
				{#if product.image}
					<img src={product.image} alt={product.name} class="h-16 w-16 rounded object-cover" />
				{:else}
					<div
						class="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-xs text-gray-500"
					>
						写真なし
					</div>
				{/if}
				<div class="flex flex-1 flex-col">
					<div class="text-sm md:text-base">{product.name}</div>
					<div class="text-sm text-gray-500 md:text-base">
						{product.price.toLocaleString()}<span class="pl-1 text-xs text-gray-600 md:text-sm"
							>円</span
						>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
