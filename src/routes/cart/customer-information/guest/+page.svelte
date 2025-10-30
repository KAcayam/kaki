<script lang="ts">
	import GuestForm from '$lib/components/GuestForm.svelte';
</script>

<div class="mx-auto w-full max-w-sm px-4">
	<div class="text-gray-500">ゲスト購入</div>
	<div class="text-sm text-gray-400">購入後に下記情報を登録することができます</div>
	<GuestForm cancelLink="/cart/customer-information" />
</div>
