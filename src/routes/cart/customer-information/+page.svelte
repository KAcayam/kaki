<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import AccountData from '$lib/components/panel/AccountData.svelte';
	import { isLoggedIn } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import AccountEdit from '$lib/components/panel/AccountEdit.svelte';
	import data from '$lib/data.json';

	// data.jsonからサンプルを取得
	let user = $state(data.user.find((u) => u.isPrimary)!);

	let showEditModal = $state(false);

	function handleSave(updatedAccount: any) {
		Object.assign(user, updatedAccount);
		showEditModal = false;
	}

	let { shippingLink = '/cart/shipping-information' } = $props<{ shippingLink?: string }>();
</script>

{#if $isLoggedIn}
	<!-- ストアの値を参照 -->
	<AccountData {user} />

	<div class="mx-auto mt-6 flex w-72 flex-col items-center gap-4">
		<Button
			onclick={() => goto(shippingLink)}
			class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600">次へ</Button
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
		<Button
			class="w-full cursor-pointer text-gray-600"
			variant="outline"
			onclick={() => goto('/customer-information/login')}>ログイン</Button
		>
		<Button
			class="w-full cursor-pointer text-gray-600"
			variant="outline"
			onclick={() => goto('/customer-information/guest')}>ゲスト購入</Button
		>
		<Button
			class="w-full cursor-pointer text-gray-600"
			variant="outline"
			onclick={() => goto('/customer-information/signup')}>新規登録</Button
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
