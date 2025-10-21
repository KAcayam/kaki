<script lang="ts">
	import Calendar from '$lib/components/ui/calendar/calendar.svelte';
	import { CalendarDate, type DateValue, today, getLocalTimeZone } from '@internationalized/date';

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

	let placeholder: CalendarDate = today(getLocalTimeZone());
</script>

<Calendar
	type="multiple"
	{isDateDisabled}
	{value}
	bind:placeholder
	readonly={true}
	class="rounded-lg border shadow-sm"
/>
