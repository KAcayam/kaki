<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Calendar from '$lib/components/SelectCalendar.svelte';
	import CalendarIcon from 'lucide-svelte/icons/calendar-search';
	import ProductCard from '$lib/components/ProductCard.svelte';

	// サンプル画像パス
	import Kaki1 from '$lib/images/sample/kaki1.png';
	import Kaki2 from '$lib/images/sample/kaki2.jpeg';
	import Kaki3 from '$lib/images/sample/kaki3.jpg';
	import muki1 from '$lib/images/sample/muki1.jpg';

	let openCalendar = $state(false);

	// サンプル商品データ
	const products = [
		{ id: 'oyster-001', name: '殻付き生牡蠣', price: 4800, image: Kaki1, type: 'with-shell' },
		{ id: 'oyster-002', name: '特選殻付き生牡蠣', price: 5200, image: Kaki2, type: 'with-shell' },
		{ id: 'oyster-003', name: '隠岐産殻付き生牡蠣', price: 7900, image: Kaki3, type: 'with-shell' },
		{ id: 'oyster-004', name: '画像なし商品サンプル', price: 3500, type: 'no-image' },
		{
			id: 'oyster-005',
			name: 'むき身 ページサンプル',
			price: 2800,
			image: muki1,
			type: 'no-shell'
		},
		{ id: 'oyster-006', name: 'ログイン必須商品A', isLoggedInRequired: true },
		{ id: 'oyster-007', name: 'ログイン必須商品B', isLoggedInRequired: true }
	];
</script>

<main class="flex w-full flex-col items-center">
	<!-- タイトル・ロゴ -->
	<section class="mt-8 mb-4 flex w-full flex-col items-center">
		<div class="flex flex-col items-center">
			<div class="flex items-center gap-4">
				<div class="mb-2 flex h-16 w-40 items-center justify-center rounded bg-gray-300">
					<span class="text-2xl font-bold text-white">ロゴなど</span>
				</div>
				<h1 class="mb-2 text-4xl">新鮮な牡蠣販売所</h1>
			</div>
			<div class="max-w-xl text-center text-gray-500">
				新鮮な牡蠣を産地から直接お届けします。期間限定の旬の味をお楽しみください。
			</div>
		</div>
	</section>
	<div class="w-full max-w-screen-2xl px-8">
		<!-- カレンダー -->
		<div class="mb-4 flex w-full justify-end">
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
		</div>

		<!-- 商品パネル -->
		<section
			class="mb-8 grid w-full grid-cols-2 justify-between gap-6 md:grid-cols-3 xl:grid-cols-4"
		>
			{#each products as product (product.id)}
				<div class="w-full">
					<ProductCard {product} />
				</div>
			{/each}
		</section>
	</div>
</main>
