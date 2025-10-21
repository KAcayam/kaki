<script lang="ts">
	import { ChevronLeft } from 'lucide-svelte';
	import ProductImageGallery from '$lib/components/detail/ProductImageGallery.svelte';
	import ProductPurchasePanel from '$lib/components/detail/ProductPurchasePanel.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import Calendar from '$lib/components/SelectCalendar.svelte';
	import CalendarIcon from 'lucide-svelte/icons/calendar';

	let openCalendar = $state(false);

	const product = {
		name: '殻付き生牡蠣',
		price: 4800,
		inStock: true
	};
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mb-4 ml-8 self-start">
			<a href="/">
				<button
					class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
				>
					<ChevronLeft class="h-4 w-4 text-gray-600" />
					<span class="text-sm">TOPに戻る</span>
				</button>
			</a>
		</div>

		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-2xl">{product.name}</div>
		</div>

		<div class="mx-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
			<!-- Left Column: Image Gallery and Description -->
			<div>
				<ProductImageGallery />
				<div class="mt-2 text-sm text-muted-foreground">
					<p>・販売は1kg単位になります。自然のものなので多少の前後があることをご理解ください。</p>
					<p>・その他注意書きがあるときもこちらに</p>
				</div>
			</div>

			<!-- Right Column: Product Info & Purchase -->
			<ProductPurchasePanel {product} />
		</div>
	</div>
</div>
