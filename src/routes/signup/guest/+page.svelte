<script lang="ts">
	import ConfirmAccountUpdateModal from '$lib/components/ui/ConfirmAccountUpdateModal.svelte';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';
	import GuestSignupForm from './GuestSignupForm.svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	// ゲストユーザー情報 (ID: 2)
	let guestUser = $state(data.user.find((u) => u.id === '2')!);

	// 確認モーダル用の一時アカウント情報
	let tempAccount = $state({ ...guestUser });

	// 確認モーダル表示フラグ
	let showConfirmModal = $state(false);

	// フォームから保存イベントを受け取る
	function handleSaveTemp(updated: any) {
		Object.assign(tempAccount, updated);
		showConfirmModal = true;
	}

	function handleConfirmUpdate() {
		// ここで実際の登録処理を行う
		showConfirmModal = false;
		toast.success('正しく登録されました');
		goto('/');
	}

	// モーダルをキャンセル
	function handleCancelUpdate() {
		tempAccount = { ...guestUser };
		showConfirmModal = false;
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col justify-center pt-4 md:mx-8">
		<!-- ヘッダー -->
		<div class="mb-2 self-start md:mb-4">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">TOPに戻る</span>
			</a>
		</div>

		<!-- ページタイトル -->
		<div class="mb-2 flex flex-row items-center gap-8 md:mb-4">
			<div class="text-base md:text-xl">アカウント情報登録</div>
		</div>

		<!-- アカウント登録フォーム -->
		<div class="flex w-full flex-col items-center">
			<GuestSignupForm
				{guestUser}
				onSave={handleSaveTemp}
				onCancel={() => alert('キャンセルしました')}
			/>
		</div>
	</div>
</div>

<!-- 登録確認モーダル -->
<ConfirmAccountUpdateModal
	bind:open={showConfirmModal}
	{tempAccount}
	onConfirm={handleConfirmUpdate}
	onCancel={handleCancelUpdate}
/>
