<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Checkbox from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { getLocalTimeZone, today, type CalendarDate } from '@internationalized/date';
	import * as Select from '$lib/components/ui/select/index.js';
	import SelectCalendar from '$lib/components/ui/SelectCalendar.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { goto } from '$app/navigation';

	// 親コンポーネントからカートアイテムを受け取る
	type CartItem = {
		id: string;
		title: string;
		variant: string;
		price: number;
		quantity: number;
		img: string | null;
	};

	let { items }: { items: CartItem[] } = $props();

	const subtotal = $derived(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
	const total = $derived(subtotal);

	// 配送希望日時
	let deliveryOption: 'none' | 'specific' = $state('none');
	let selectedDate: CalendarDate | undefined = $state();
	let selectedTime: string = $state('');

	const timeOptions = [
		{ value: '指定なし', label: '指定なし' },
		{ value: '午前', label: '午前' },
		{ value: '午後', label: '午後' },
		{ value: '夜', label: '夜' }
	];
	const triggerTimeContent = $derived(
		timeOptions.find((t) => t.value === selectedTime)?.label ?? '時間帯を選択'
	);

	// ギフト用チェックボックス
	let isGift: boolean = $state(false);

	const datePickerId = 'delivery-date-picker';
	let datePickerOpen = $state(false);

	function handleProceedToNext() {
		goto('/cart/customer-information');
	}

	function handleContinueShopping() {
		goto('/');
	}
</script>

<div class="h-fit w-full max-w-sm rounded-lg border border-gray-200 p-6">
	<div class="mb-4">
		<div class="flex items-center justify-between">
			<div class="text-sm">商品小計</div>
			<div class="">
				{subtotal.toLocaleString()}<span class="pl-1 text-xs text-gray-500 md:text-sm">円</span>
			</div>
		</div>
	</div>

	<div class="">
		<div class="flex items-center justify-between">
			<div class="text-sm text-gray-500">送料</div>
			<div class="text-sm text-gray-600">住所入力後に確定</div>
		</div>
	</div>

	<div class="pt-6">
		<div class="flex items-center justify-between">
			<div class="flex flex-row items-baseline gap-3">
				<div class="text-lg">合計</div>
				<div class="text-sm text-gray-500">税込</div>
			</div>
			<div class="text-xl font-semibold">
				{total.toLocaleString()}<span class="pl-1 text-xs text-gray-500 md:text-sm">円</span>
			</div>
		</div>
	</div>

	<Separator class="my-4" />

	<!-- 配送希望日時 -->
	<div class="mb-6">
		<SelectCalendar />
	</div>

	<div class="mb-6">
		<RadioGroup.Root class="flex flex-col space-y-2" bind:value={deliveryOption}>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="none" id="delivery-none" class="cursor-pointer" />
				<Label for="delivery-none" class="text-gray-600">配送希望日時なし</Label>
			</div>
			<div class="flex items-center space-x-2">
				<RadioGroup.Item value="specific" id="delivery-specific" class="cursor-pointer" />
				<Label for="delivery-specific" class="text-gray-600">配送希望日時</Label>
			</div>
		</RadioGroup.Root>

		{#if deliveryOption === 'specific'}
			<div class="mt-2 flex flex-row gap-4">
				<!-- 日時指定 -->
				<div>
					<Popover.Root bind:open={datePickerOpen}>
						<Popover.Trigger id={datePickerId}>
							{#snippet child({ props })}
								<Button
									{...props}
									variant="outline"
									class="w-full cursor-pointer justify-between font-normal text-gray-700"
								>
									{selectedDate
										? selectedDate.toDate(getLocalTimeZone()).toLocaleDateString('ja-JP')
										: '日付を選択'}
									<ChevronDownIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							{/snippet}
						</Popover.Trigger>
						<Popover.Content class="w-auto overflow-hidden p-0" align="start">
							<Calendar
								type="single"
								bind:value={selectedDate}
								captionLayout="dropdown"
								onValueChange={() => {
									datePickerOpen = false;
								}}
								minValue={today(getLocalTimeZone())}
							/>
						</Popover.Content>
					</Popover.Root>
				</div>

				<!-- 時間帯指定 -->
				<div>
					<Select.Root type="single" name="deliveryTime" bind:value={selectedTime}>
						<Select.Trigger id="time-select" class="w-full cursor-pointer text-gray-700">
							{triggerTimeContent}
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								{#each timeOptions as option (option.value)}
									<Select.Item value={option.value} label={option.label}>
										{option.label}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		{/if}
	</div>

	<!-- ギフト用 -->
	<div class="mb-6 pt-2">
		<div class="flex items-center space-x-2">
			<Checkbox.Root id="gift-option" bind:checked={isGift} class="cursor-pointer" />
			<Label for="gift-option" class="text-gray-600">ギフト用</Label>
		</div>
	</div>

	<!-- 諸注意 -->
	<div class="mb-6 space-y-2 text-sm text-muted-foreground">
		<p>
			お届け予定日： <span class="text-gray-700">通常2〜6日後にお届け</span>
		</p>
		<div class="text-xs leading-[0.5]">※ 出荷不可日、一部離島は除く</div>
		<div class="text-xs">※ 出荷は支払い確認後となります</div>
	</div>

	<div class="flex flex-col gap-3">
		<Button
			class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
			onclick={handleProceedToNext}>次に進む</Button
		>
		<Button
			class="w-full cursor-pointer text-gray-600 hover:text-gray-700"
			variant="outline"
			onclick={handleContinueShopping}>買い物を続ける</Button
		>
	</div>
</div>
