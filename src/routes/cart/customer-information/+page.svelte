<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import AccountData from '$lib/components/account/AccountData.svelte';
	import { isLoggedIn } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import AccountEdit from '$lib/components/account/AccountEdit.svelte';
	import data from '$lib/data.json';

	// data.jsonからサンプルを取得
	let user = $state(data.user.find((u) => u.isPrimary)!);

	let showEditModal = $state(false);

	function handleSave(updatedAccount: any) {
		Object.assign(user, updatedAccount);
		showEditModal = false;
	}

	const {
		shippingLink = '/cart/shipping-information',
		loginLink = '/cart/customer-information/login',
		guestLink = '/cart/customer-information/guest',
		signupLink = '/cart/customer-information/signup'
	} = $props<{
		shippingLink?: string;
		loginLink?: string;
		guestLink?: string;
		signupLink?: string;
	}>();

	function goToShipping() {
		goto(shippingLink);
	}

	function goToLogin() {
		goto(loginLink);
	}

	function goToGuest() {
		goto(guestLink);
	}

	function goToSignup() {
		goto(signupLink);
	}
</script>

{#if $isLoggedIn}
	<div class="flex w-full flex-col items-center px-4">
		<AccountData {user} />
	</div>

	<div class="mx-auto mt-6 flex w-72 flex-col items-center gap-4">
		<Button onclick={goToShipping} class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
			>次へ</Button
		>
		<div class="flex w-full">
			<button
				type="button"
				onclick={() => (showEditModal = true)}
				class="cursor-pointer bg-transparent p-0 text-left text-sm text-gray-500"
				>アカウント情報を編集する</button
			>
		</div>
	</div>
{:else}
	<div class="mx-auto mt-6 flex w-72 flex-col items-center gap-8">
		<Button class="w-full cursor-pointer text-gray-600" variant="outline" onclick={goToLogin}
			>ログイン</Button
		>
		<Button class="w-full cursor-pointer text-gray-600" variant="outline" onclick={goToGuest}
			>ゲスト購入</Button
		>
		<Button class="w-full cursor-pointer text-gray-600" variant="outline" onclick={goToSignup}
			>新規登録</Button
		>
	</div>
{/if}

<!-- アカウント編集モーダル -->
<Dialog.Root bind:open={showEditModal}>
	<Dialog.Content
		class="w-auto max-w-md"
		onOpenAutoFocus={(e) => {
			e.preventDefault();
		}}
	>
		<AccountEdit
			editingAccount={user}
			onSave={handleSave}
			onCancel={() => (showEditModal = false)}
		/>
	</Dialog.Content>
</Dialog.Root>