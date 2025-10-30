<script lang="ts">
	import SignupForm from '$lib/components/SignupForm.svelte';
</script>

<div class="mx-auto w-full max-w-sm px-4">
	<div class="mb-2 text-gray-500">新規登録</div>
	<SignupForm cancelLink="/cart/customer-information" />
</div>
