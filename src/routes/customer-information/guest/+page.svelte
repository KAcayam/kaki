<script lang="ts">
	import GuestForm from '$lib/components/GuestForm.svelte';
</script>

<div class="mx-auto w-full max-w-sm px-4">
	<div class="mb-2 text-gray-500">ゲスト購入</div>
	<GuestForm cancelLink="/customer-information" />
</div>
