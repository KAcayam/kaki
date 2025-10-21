<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	export let id: string;
	export let label: string = '都道府県';
	export let error: string | null = null;
	export let value: string = ''; // 選択された都道府県のvalue (例: 'tokyo')
	export let required: boolean = false;

	// 都道府県リスト
	const prefectures = [
		{ value: 'hokkaido', label: '北海道' },
		{ value: 'aomori', label: '青森県' },
		{ value: 'iwate', label: '岩手県' },
		{ value: 'miyagi', label: '宮城県' },
		{ value: 'akita', label: '秋田県' },
		{ value: 'yamagata', label: '山形県' },
		{ value: 'fukushima', label: '福島県' },
		{ value: 'ibaraki', label: '茨城県' },
		{ value: 'tochigi', label: '栃木県' },
		{ value: 'gunma', label: '群馬県' },
		{ value: 'saitama', label: '埼玉県' },
		{ value: 'chiba', label: '千葉県' },
		{ value: 'tokyo', label: '東京都' },
		{ value: 'kanagawa', label: '神奈川県' },
		{ value: 'niigata', label: '新潟県' },
		{ value: 'toyama', label: '富山県' },
		{ value: 'ishikawa', label: '石川県' },
		{ value: 'fukui', label: '福井県' },
		{ value: 'yamanashi', label: '山梨県' },
		{ value: 'nagano', label: '長野県' },
		{ value: 'gifu', label: '岐阜県' },
		{ value: 'shizuoka', label: '静岡県' },
		{ value: 'aichi', label: '愛知県' },
		{ value: 'mie', label: '三重県' },
		{ value: 'shiga', label: '滋賀県' },
		{ value: 'kyoto', label: '京都府' },
		{ value: 'osaka', label: '大阪府' },
		{ value: 'hyogo', label: '兵庫県' },
		{ value: 'nara', label: '奈良県' },
		{ value: 'wakayama', label: '和歌山県' },
		{ value: 'tottori', label: '鳥取県' },
		{ value: 'shimane', label: '島根県' },
		{ value: 'okayama', label: '岡山県' },
		{ value: 'hiroshima', label: '広島県' },
		{ value: 'yamaguchi', label: '山口県' },
		{ value: 'tokushima', label: '徳島県' },
		{ value: 'kagawa', label: '香川県' },
		{ value: 'ehime', label: '愛媛県' },
		{ value: 'kochi', label: '高知県' },
		{ value: 'fukuoka', label: '福岡県' },
		{ value: 'saga', label: '佐賀県' },
		{ value: 'nagasaki', label: '長崎県' },
		{ value: 'kumamoto', label: '熊本県' },
		{ value: 'oita', label: '大分県' },
		{ value: 'miyazaki', label: '宮崎県' },
		{ value: 'kagoshima', label: '鹿児島県' },
		{ value: 'okinawa', label: '沖縄県' }
	];

	// 都道府県Trigger 表示
	$: prefectureTrigger = prefectures.find((p) => p.value === value)?.label ?? '選択してください';
</script>

<div class="relative flex w-full max-w-sm flex-col gap-1.5">
	{#if label}
		<Label for={id}>
			{label}{#if required}
				<span class="text-red-500">*</span>
			{/if}
		</Label>
	{/if}
	<Select.Root type="single" name={id} bind:value>
		<Select.Trigger class="w-full">
			{prefectureTrigger}
		</Select.Trigger>
		<Select.Content class="w-full">
			<Select.Group>
				<Select.Label>都道府県</Select.Label>
				{#each prefectures as p (p.value)}
					<Select.Item value={p.value} label={p.label}>
						{p.label}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
	{#if error}
		<p class="text-sm text-red-500">{error}</p>
	{/if}
</div>
