<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	// 親から渡されるデータとイベントハンドラ
	let {
		editingAccount = null,
		onSave = (_updatedAccount: any) => {},
		onCancel = () => {}
	} = $props<{
		editingAccount?: any | null;
		onSave?: (updatedAccount: any) => void;
		onCancel?: () => void;
	}>();

	// フォームの状態
	let lastName = $state(editingAccount?.lastName || '');
	let firstName = $state(editingAccount?.firstName || '');
	let lastNameKana = $state(editingAccount?.lastNameKana || '');
	let firstNameKana = $state(editingAccount?.firstNameKana || '');
	let email = $state(editingAccount?.email || '');
	let postalCode = $state(editingAccount?.postalCode || '');
	let prefecture = $state(editingAccount?.prefecture || '');
	let address1 = $state(editingAccount?.address1 || '');
	let address2 = $state(editingAccount?.address2 || '');
	let phone = $state(editingAccount?.phone || '');
	let receiveCampaignEmails = $state(editingAccount?.receiveCampaignEmails || false);

	// フォーム送信処理
	function onsubmitForm(e: SubmitEvent) {
		e.preventDefault();

		// TODO: バリデーションをここに追加

		// 親コンポーネントに更新されたデータを渡す
		onSave({
			lastName,
			firstName,
			lastNameKana,
			firstNameKana,
			email,
			postalCode,
			prefecture,
			address1,
			address2,
			phone,
			receiveCampaignEmails
		});
	}
</script>

<div class="flex flex-col items-center gap-4">
	<Card.Root class="w-full max-w-sm border-0 shadow-none">
		<Card.Header>
			<Card.Title>アカウント情報編集</Card.Title>
		</Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-6" onsubmit={onsubmitForm} novalidate>
				<div class="grid grid-cols-2 gap-4">
					<FormInput id="account-last-name" label="姓" type="text" bind:value={lastName} />
					<FormInput id="account-first-name" label="名" type="text" bind:value={firstName} />
				</div>
				<div class="grid grid-cols-2 gap-4">
					<FormInput
						id="account-last-name-kana"
						label="姓(カナ)"
						type="text"
						bind:value={lastNameKana}
					/>
					<FormInput
						id="account-first-name-kana"
						label="名(カナ)"
						type="text"
						bind:value={firstNameKana}
					/>
				</div>
				<FormInput id="account-email" label="メールアドレス" type="email" bind:value={email} />

				<FormInput id="account-postal-code" label="郵便番号" type="text" bind:value={postalCode} />
				<SelectPrefecture id="account-prefecture" bind:value={prefecture} />
				<FormInput id="account-address1" label="住所１" type="text" bind:value={address1} />
				<FormInput id="account-address2" label="住所２" type="text" bind:value={address2} />
				<FormInput id="account-phone" label="電話番号" type="text" bind:value={phone} />

				<div class="flex items-center gap-2 pt-2">
					<input
						id="campaign-edit"
						type="checkbox"
						class="h-4 w-4 cursor-pointer"
						bind:checked={receiveCampaignEmails}
					/>
					<label for="campaign-edit" class="text-sm text-gray-600"
						>キャンペーンメールを受信する</label
					>
				</div>

				<div class="flex flex-col items-center gap-3 pt-4">
					<Button type="submit" class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600"
						>保存</Button
					>
					<Button
						type="button"
						variant="outline"
						onclick={onCancel}
						class="w-72 cursor-pointer text-gray-600">キャンセル</Button
					>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
