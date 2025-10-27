<!-- src/lib/components/ui/CartItemCard.svelte -->
<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import { Button } from '$lib/components/ui/button';
	import { Trash2 } from 'lucide-svelte';

	// Propsの型定義
	interface ItemProps {
		id: string;
		title: string;
		variant: 'kg' | '個' | 'パック';
		price: number;
		quantity: number;
		img?: string;
	}

	interface CartItemCardProps {
		item: ItemProps;
		onRemove: (id: string) => void;
		onChangeQuantity: (id: string, quantity: number) => void;
	}

	// props を受け取る（Svelte 5 の $props を利用）
	let { item, onRemove, onChangeQuantity }: CartItemCardProps = $props();

	// 選択肢（文字列で管理）
	const quantities = Array.from({ length: 10 }, (_, i) => String(i + 1));

	// selectedQuantity は $state で作る（テンプレートにそのまま出せるリアクティブ値）
	let selectedQuantity = $state(String(item.quantity));

	// selectedQuantity の変化を監視して親に通知（$effect）
	$effect(() => {
		// 注意: $effect の中で直接テンプレートの reactive 値を参照すると依存として追跡される
		const q = Number(selectedQuantity);
		if (q !== item.quantity) {
			onChangeQuantity(item.id, q);
		}
	});

	// 単位テキストは $derived.by を使って計算（関数で複雑な処理をする場合）
	let unitText = $derived.by(() => {
		switch (item.variant) {
			case 'kg':
				return 'kg';
			case 'パック':
				return 'パック';
			case '個':
			default:
				return '個';
		}
	});
</script>

<div class="flex gap-4 rounded-lg border border-gray-200 p-4">
	<!-- 商品写真 -->
	<div
		class="flex h-40 w-40 flex-shrink-0 items-center justify-center overflow-hidden rounded-md border border-gray-100"
	>
		{#if item.img}
			<img src={item.img} alt={item.title} class="max-h-full max-w-full object-contain" />
		{:else}
			<span class="text-sm text-gray-400">画像なし</span>
		{/if}
	</div>

	<div class="flex flex-1 flex-col justify-between">
		<div>
			<!-- 商品名 -->
			<h2 class="text-lg font-medium">{item.title}</h2>
			<!-- 税込単価 -->
			<p class="mt-2 text-xl font-semibold">
				{item.price.toLocaleString()} <span class="text-sm font-normal">円</span><span
					class="pl-3 text-sm text-gray-400">税込</span
				>
			</p>
		</div>

		<div class="mt-4 flex items-center gap-2">
			<!-- 数量変更用Select -->
			<Select.Root type="single" name={`quantity-${item.id}`} bind:value={selectedQuantity}>
				<Select.Trigger class="h-10 w-[70px] cursor-pointer">
					{selectedQuantity}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each quantities as qty (qty)}
							<Select.Item value={qty} label={qty}>
								{qty}
							</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<!-- 単位テキスト -->
			<span class="text-sm text-gray-700">{unitText}</span>

			<!-- 削除ボタン -->
			<Button
				variant="ghost"
				size="icon"
				class="cursor-pointer text-gray-500 hover:text-red-500"
				onclick={() => onRemove(item.id)}
				aria-label="削除"
			>
				<Trash2 class="h-5 w-5" />
			</Button>
		</div>
	</div>
</div>
