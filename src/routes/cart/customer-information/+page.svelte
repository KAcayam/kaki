<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import AccountData from '$lib/components/account/AccountData.svelte';
	import AccountEdit from '$lib/components/account/AccountEdit.svelte';
	import ConfirmAccountUpdateModal from '$lib/components/ui/ConfirmAccountUpdateModal.svelte';
	import { isLoggedIn } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import data from '$lib/data.json';

	// サンプルユーザー取得
	let user = $state(data.user.find((u) => u.isPrimary)!);

	let isEditing = $state(false);

	// 確認モーダル用一時アカウント
	let tempAccount = $state({ ...user });
	let showConfirmModal = $state(false);

	// AccountEdit の保存時
	function handleSave(updatedAccount: any) {
		Object.assign(tempAccount, updatedAccount);
		showConfirmModal = true;
	}

	function handleConfirmUpdate() {
		Object.assign(user, tempAccount);
		showConfirmModal = false;
		isEditing = false;
		toast.success('正しく更新されました');
	}

	function handleCancelUpdate() {
		tempAccount = { ...user }; // キャンセル時に戻す
		showConfirmModal = false;
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
	<div class="flex w-full flex-col items-center px-8">
		{#if isEditing}
			<AccountEdit
				editingAccount={tempAccount}
				onSave={handleSave}
				onCancel={() => (isEditing = false)}
			/>
		{:else}
			<AccountData {user} />
		{/if}
	</div>

	{#if !isEditing}
		<div class="mx-auto mt-6 flex w-72 flex-col items-center gap-4">
			<Button onclick={goToShipping} class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
				>次へ</Button
			>
			<div class="flex w-full">
				<button
					type="button"
					onclick={() => {
						tempAccount = { ...user }; // 編集開始前に一時保存
						isEditing = true;
					}}
					class="cursor-pointer bg-transparent p-0 text-left text-sm text-gray-500"
				>
					アカウント情報を編集する
				</button>
			</div>
		</div>
	{/if}

	<!-- 確認モーダル -->
	<ConfirmAccountUpdateModal
		bind:open={showConfirmModal}
		{tempAccount}
		onConfirm={handleConfirmUpdate}
		onCancel={handleCancelUpdate}
	/>
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
