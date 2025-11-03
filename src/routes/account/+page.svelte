<script lang="ts">
	import AccountData from '$lib/components/account/AccountData.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import AccountEdit from '$lib/components/account/AccountEdit.svelte';
	import PasswordReset from './PasswordReset.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';

	// ログイン状態でメインアカウントは必ずあるので !　をつけて型エラーを回避
	let user = $state(data.user.find((u) => u.isPrimary)!);

	let showEditModal = $state(false);
	let showResetModal = $state(false);

	function handleSave(updatedAccount: any) {
		Object.assign(user, updatedAccount);
		showEditModal = false;
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">TOPに戻る</span>
			</a>
		</div>
		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-xl">アカウント情報</div>
		</div>

		<div class="flex w-full flex-col items-center px-4">
			<AccountData {user} />
		</div>

		<div class="mx-auto flex w-72 flex-col gap-3 pt-6">
			<Button
				class="w-full cursor-pointer text-gray-600"
				variant="outline"
				onclick={() => (showEditModal = true)}>アカウント情報編集</Button
			>
			<Button
				class="w-full cursor-pointer text-gray-600"
				variant="outline"
				onclick={() => (showResetModal = true)}>パスワード変更</Button
			>
		</div>
	</div>
</div>

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

<!-- パスワード変更モーダル -->
<Dialog.Root bind:open={showResetModal}>
	<Dialog.Content
		class="w-auto max-w-md"
		onOpenAutoFocus={(e) => {
			e.preventDefault();
		}}
	>
		<PasswordReset onCancel={() => (showResetModal = false)} />
	</Dialog.Content>
</Dialog.Root>
