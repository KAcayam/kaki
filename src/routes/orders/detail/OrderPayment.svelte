<script lang="ts">
	import type { OrderSummary } from '$lib/types';

	let { subtotal, shippingCost, total }: OrderSummary = $props();
</script>

<div class="rounded-lg border px-4 py-3 text-card-foreground">
	<div class="space-y-2">
		<div class="flex justify-between text-sm">
			<div class="text-gray-600">小計</div>
			<div>
				{subtotal.toLocaleString()}<span class="pl-1 text-xs text-gray-500 md:text-sm">円</span>
			</div>
		</div>
		<div class="flex justify-between text-sm">
			<div class="text-gray-600">送料</div>
			<div>
				{shippingCost.toLocaleString()}<span class="pl-1 text-xs text-gray-500 md:text-sm">円</span>
			</div>
		</div>

		<div class="flex justify-between">
			<div>
				<span class="font-semibold">合計</span>
				<span class="pl-1 text-xs text-gray-400 md:text-sm">税込</span>
			</div>
			<div class="text-lg font-semibold">
				{total.toLocaleString()}<span class="pl-1 text-xs text-gray-500 md:text-sm">円</span>
			</div>
		</div>
	</div>
</div>
