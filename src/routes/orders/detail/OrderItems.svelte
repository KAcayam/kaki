<script lang="ts">
	import type { Order } from '$lib/types';

	// $propsで受け取る
	let { order }: { order: Order } = $props();
</script>

<div class="mb-2 rounded-lg border px-4 pt-3 pb-2">
	<div class="text-xs text-gray-500 md:text-sm">注文商品</div>
	<div class="mt-2 space-y-2">
		{#each order.products as product}
			<div class="flex items-start gap-4 border-t pt-2">
				{#if product.image}
					<img src={product.image} alt={product.name} class="h-24 w-24 rounded object-cover" />
				{:else}
					<div
						class="flex h-24 w-24 items-center justify-center rounded bg-gray-100 text-xs text-gray-500"
					>
						写真なし
					</div>
				{/if}
				<div class="flex flex-1 flex-col">
					<div class="text-sm md:text-base">{product.name}</div>
					<div class="text-sm text-gray-600 md:text-base">
						{product.price.toLocaleString()}<span class="pl-1 text-xs text-gray-600 md:text-sm"
							>円</span
						>
					</div>
					<div class="mt-2 text-xs text-gray-700 md:text-sm">個数：{product.quantity}</div>
				</div>
			</div>
		{/each}
	</div>
</div>
