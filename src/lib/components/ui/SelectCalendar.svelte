<script lang="ts">
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { CalendarDate, type DateValue, today, getLocalTimeZone } from '@internationalized/date';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import CalendarIcon from 'lucide-svelte/icons/calendar-search';

	let openCalendar = $state(false);

	// 出荷不可日
	// prettier-ignore
	const PRESELECTED = [
    new CalendarDate(2025, 10, 12),
    new CalendarDate(2025, 10, 24),
    new CalendarDate(2025, 11, 4),
    new CalendarDate(2025, 11, 12),
    new CalendarDate(2025, 11, 13),
  ];

	const keyOf = (d: { year: number; month: number; day: number }) =>
		`${d.year}-${d.month}-${d.day}`;
	const preselectedSet = new Set(PRESELECTED.map(keyOf));

	let value: CalendarDate[] = [...PRESELECTED];

	function isDateDisabled(date: DateValue): boolean {
		return !preselectedSet.has(keyOf(date));
	}

	let placeholder: CalendarDate = $state(today(getLocalTimeZone()));
</script>

<div class="flex items-center gap-2">
	<Popover.Root bind:open={openCalendar}>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" class="cursor-pointer !p-0">
					<CalendarIcon class="!h-7 !w-7 text-gray-600" />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="w-auto overflow-hidden p-0">
			<Calendar
				type="multiple"
				{isDateDisabled}
				{value}
				bind:placeholder
				readonly={true}
				class="rounded-lg border shadow-sm"
			/>
		</Popover.Content>
	</Popover.Root>
	<div class="flex flex-col gap-0.5">
		<div class="text-sm leading-none text-gray-600">出荷カレンダー</div>
		<div class="text-sm leading-none text-red-500">赤印の日は出荷不可</div>
	</div>
</div>
