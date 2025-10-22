<script lang="ts">
	let { images }: { images: string[] } = $props();

	let selectedThumbnailIndex = $state(0);

	// imagesが空の場合に備え、undefinedにならないように空の配列をデフォルトとする
	const effectiveImages = $derived(images && images.length > 0 ? images : []);

	let mainImage = $derived(
		effectiveImages.length > 0 ? effectiveImages[selectedThumbnailIndex] : null
	);

	let thumbnails = $derived(effectiveImages);

	function selectImage(index: number) {
		selectedThumbnailIndex = index;
	}

	// プロパティである images が外部から変更された場合の処理
	$effect(() => {
		if (effectiveImages.length === 0) {
			selectedThumbnailIndex = 0;
		} else if (selectedThumbnailIndex >= effectiveImages.length) {
			selectedThumbnailIndex = 0;
		}
	});
</script>

<div class="flex flex-col items-start bg-card pb-4">
	<div class="rounded-lg border">
		{#if mainImage}
			<img src={mainImage} alt="商品写真" class="h-96 rounded-lg object-contain" />
		{:else}
			<div class="flex h-72 w-96 items-center justify-center rounded-lg bg-gray-200 text-gray-500">
				画像なし
			</div>
		{/if}
	</div>
	<div class="mt-4 flex gap-3">
		{#each thumbnails as thumbnail, i}
			<button onclick={() => selectImage(i)}>
				<img
					src={thumbnail}
					alt="サムネイル {i + 1}"
					class="h-16 w-16 rounded-md object-cover transition-all {selectedThumbnailIndex === i
						? 'border-2 border-gray-400'
						: 'border border-border'}"
				/>
			</button>
		{/each}
	</div>
</div>
