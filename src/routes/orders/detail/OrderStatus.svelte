<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Order } from '$lib/types';

	// $propsで受け取る
	let { order }: { order: Order } = $props();
</script>

<div class="mb-2 rounded-lg border p-4">
	<!-- ステータス行 -->
	<div class="grid grid-cols-2 gap-2 md:flex md:justify-between">
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
	</div>
</div>
