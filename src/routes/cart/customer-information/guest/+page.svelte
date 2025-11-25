<script lang="ts">
	import GuestForm from '$lib/components/account/GuestForm.svelte';
</script>

<div class="mx-auto w-full max-w-sm px-4">
	<div class="text-sm text-gray-500 md:text-base">ゲスト購入</div>
	<div class="text-xs text-gray-400 md:text-sm">購入後に下記情報を登録することができます</div>
	<GuestForm cancelLink="/cart/customer-information" />
</div>
