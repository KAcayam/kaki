<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import AccountData from '$lib/components/account/AccountData.svelte';
	import AccountEdit from '$lib/components/account/AccountEdit.svelte';
	import PasswordReset from './PasswordReset.svelte';
	import ConfirmAccountUpdateModal from '$lib/components/ui/ConfirmAccountUpdateModal.svelte';
	import ConfirmPasswordResetModal from './ConfirmPasswordResetModal.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import data from '$lib/data.json';

	// メインユーザー情報
	let user = $state(data.user.find((u) => u.isPrimary)!);

	// 編集モード切り替え
	let isEditing = $state(false);

	// パスワードリセットモード切り替え
	let isResettingPassword = $state(false);

	// 確認モーダル用一時アカウント（リアクティブ） - アカウント情報編集用
	let tempAccount = $state({ ...user });
	// 確認モーダル用一時パスワード（リアクティブ） - パスワードリセット用
	let tempPassword = $state({ newPassword: '', confirmPassword: '' });

	let showAccountUpdateConfirmModal = $state(false);

	let showPasswordResetConfirmModal = $state(false);

	// --- アカウント情報編集関連のハンドラ ---
	function handleSaveTemp(updated: any) {
		Object.assign(tempAccount, updated);
		showAccountUpdateConfirmModal = true; // アカウント情報編集用のモーダルを表示
	}

	function handleConfirmAccountUpdate() {
		Object.assign(user, tempAccount);
		showAccountUpdateConfirmModal = false;
		isEditing = false;
		toast.success('正しく更新されました');
	}

	function handleCancelAccountUpdate() {
		tempAccount = { ...user };
		showAccountUpdateConfirmModal = false;
	}

	// --- パスワード変更関連のハンドラ ---
	function handleSavePasswordTemp(newPassword: string, confirmPassword: string) {
		tempPassword = { newPassword, confirmPassword };
		showPasswordResetConfirmModal = true; // パスワード変更用のモーダルを表示
	}

	function handleConfirmPasswordReset() {
		toast.success('正しく変更されました');
		showPasswordResetConfirmModal = false;
		isResettingPassword = false;
		tempPassword = { newPassword: '', confirmPassword: '' }; // 一時パスワードをクリア
	}

	function handleCancelPasswordReset() {
		tempPassword = { newPassword: '', confirmPassword: '' };
		showPasswordResetConfirmModal = false;
	}

	function handlePasswordResetClick() {
		isResettingPassword = true;
		isEditing = false;
	}

	function handlePasswordResetCancel() {
		isResettingPassword = false;
		tempPassword = { newPassword: '', confirmPassword: '' };
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-4">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">TOPに戻る</span>
			</a>
		</div>

		<div class="mb-2 ml-8 flex flex-row items-center gap-8 md:mb-4">
			<div class="text-md md:text-xl">アカウント情報</div>
		</div>

		<div class="flex w-full flex-col items-center px-8">
			{#if isEditing}
				<AccountEdit
					editingAccount={tempAccount}
					onSave={handleSaveTemp}
					onCancel={() => (isEditing = false)}
				/>
			{:else if isResettingPassword}
				<PasswordReset onSave={handleSavePasswordTemp} onCancel={handlePasswordResetCancel} />
			{:else}
				<AccountData {user} />

				<div class="flex w-full max-w-sm flex-col gap-3 pt-6">
					<Button
						class="w-full cursor-pointer text-gray-600"
						variant="outline"
						onclick={() => {
							tempAccount = { ...user };
							isEditing = true;
							isResettingPassword = false;
						}}>アカウント情報編集</Button
					>
					<Button
						class="w-full cursor-pointer text-gray-600"
						variant="outline"
						onclick={handlePasswordResetClick}>パスワード変更</Button
					>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- アカウント情報編集確認モーダル -->
<ConfirmAccountUpdateModal
	bind:open={showAccountUpdateConfirmModal}
	{tempAccount}
	onConfirm={handleConfirmAccountUpdate}
	onCancel={handleCancelAccountUpdate}
/>

<!-- パスワード変更確認モーダル -->
<ConfirmPasswordResetModal
	bind:open={showPasswordResetConfirmModal}
	onConfirm={handleConfirmPasswordReset}
	onCancel={handleCancelPasswordReset}
/>
