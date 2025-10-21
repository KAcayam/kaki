<script lang="ts">
	import kaki1 from '$lib/images/sample/kaki1.png';
	import kaki2 from '$lib/images/sample/kaki2.jpeg';
	import kaki3 from '$lib/images/sample/kaki3.jpg';

	let { mainImage, thumbnails, selectedThumbnailIndex } = $state({
		mainImage: kaki1,
		thumbnails: [kaki1, kaki2, kaki3],
		selectedThumbnailIndex: 0
	});

	function selectImage(index: number) {
		mainImage = thumbnails[index];
		selectedThumbnailIndex = index;
	}
</script>

<div class="flex flex-col items-start bg-card pb-4">
	<div class="rounded-lg border">
		<img src={mainImage} alt="商品写真" class="h-96 rounded-lg object-contain" />
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
