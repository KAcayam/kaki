<script lang="ts">
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import type { OrderSummary } from '$lib/types';

	let { cartItems, subtotal, shippingCost, total }: OrderSummary = $props();

	let isDesktop = $state(false);

	onMount(() => {
		if (browser) {
			const mediaQuery = window.matchMedia('(min-width: 768px)');
			isDesktop = mediaQuery.matches;
			const handleChange = (e: MediaQueryListEvent) => {
				isDesktop = e.matches;
			};
			mediaQuery.addEventListener('change', handleChange);
			return () => {
				mediaQuery.removeEventListener('change', handleChange);
			};
		}
	});

	let accordionValue: 'order-details' | undefined = $derived.by(() => {
		return isDesktop ? 'order-details' : undefined;
	});
</script>

<div class="rounded-lg border px-6 pb-3 text-card-foreground">
	<Accordion.Root type="single" class="w-full" bind:value={accordionValue}>
		<Accordion.Item value="order-details">
			<Accordion.Trigger class="cursor-pointer text-sm text-gray-500 hover:no-underline"
				>ご注文内容</Accordion.Trigger
			>

			<Accordion.Content class="space-y-3">
				<!-- 商品リスト -->
				<div class="space-y-2">
					{#each cartItems as item (item.id)}
						<div class="flex justify-between text-sm text-gray-700">
							<div>{item.title} × {item.quantity}</div>
							<div>
								{(item.price * item.quantity).toLocaleString()}
								<span class="text-xs text-gray-500 md:text-sm">円</span>
							</div>
						</div>
					{/each}
				</div>

				<Separator />
			</Accordion.Content>
		</Accordion.Item>
	</Accordion.Root>

	<!-- 小計・送料 -->
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

		<!-- 合計 -->
		<div class="flex justify-between">
			<div>
				<span class="font-semibold">合計</span>
				<span class="pl-1 text-xs font-normal text-gray-400 md:text-sm">税込</span>
			</div>
			<div class="text-lg font-semibold">
				{total.toLocaleString()}<span class="pl-1 text-xs text-gray-500 md:text-sm">円</span>
			</div>
		</div>
	</div>
</div>
