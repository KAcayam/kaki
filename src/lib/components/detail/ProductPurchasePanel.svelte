<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import Calendar from '$lib/components/SelectCalendar.svelte';
	import CalendarIcon from 'lucide-svelte/icons/calendar-search';

	let openCalendar = $state(false);

	interface Product {
		price: number;
		inStock: boolean;
	}

	let { product }: { product: Product } = $props();

	// 数量の選択肢を生成
	const quantities = Array.from({ length: 10 }, (_, i) => i + 1); // 1から10までの配列
	let selectedQuantity = $state<string>('1'); // 選択された数量
	const triggerContent = $derived(selectedQuantity); // Select.Triggerに表示するテキスト
</script>

<div class="flex flex-col">
	<div class="max-w-xs rounded-lg border p-4">
		<div class="mb-4">
			<p class="text-sm text-muted-foreground">1kgあたり</p>
			<div class="flex items-baseline gap-2">
				<span class="text-2xl font-medium">{product.price.toLocaleString()}</span>
				<span class="text-lg">円</span>
				<span class="ml-2 text-sm text-muted-foreground">税込</span>
			</div>
			<div class="mt-2 text-sm text-gray-700">
				在庫：
				{#if product.inStock}
					<span class="font-semibold text-green-600">◯</span>
				{:else}
					<span class="font-semibold text-red-600">在庫なし</span>
				{/if}
			</div>
		</div>

		<div class="mb-6 space-y-2 text-sm text-muted-foreground">
			<p>
				お届け予定日： <span class="text-gray-700">通常2〜6日後にお届け</span>
			</p>
			<div class="flex items-center gap-2">
				<Popover.Root bind:open={openCalendar}>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" class="!p-0">
								<CalendarIcon class="!h-7 !w-7 text-gray-600" />
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-auto overflow-hidden p-0">
						<Calendar />
					</Popover.Content>
				</Popover.Root>
				<div class="flex flex-col gap-0.5">
					<div class="text-sm leading-none text-gray-600">出荷カレンダー</div>
					<div class="text-sm leading-none text-red-500">赤印の日は出荷不可</div>
				</div>
			</div>
			<p class="text-xs">※ 出荷不可日、一部離島は除く</p>
			<p class="text-xs">※ 出荷は支払い確認後となります</p>
		</div>

		<div class="mb-6">
			<div class="flex items-center gap-2">
				<Select.Root type="single" name="quantity" bind:value={selectedQuantity}>
					<Select.Trigger class="w-20">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>数量 (kg)</Select.Label>
							{#each quantities as quantity (quantity)}
								<Select.Item value={quantity.toString()} label={quantity.toString()}>
									{quantity}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
				<span class="text-sm">kg</span>
			</div>
		</div>

		<div>
			<Button type="submit" class="w-72 bg-blue-500 hover:bg-blue-600">カートに入れる</Button>
		</div>
	</div>
</div>
