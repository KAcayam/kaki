<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { signupSchema } from '$lib/schemas/auth'; // サインアップと同じスキーマを利用

	let {
		editingAccount = null,
		onSave = (_updatedAccount: any) => {},
		onCancel = () => {}
	} = $props<{
		editingAccount?: any | null;
		onSave?: (updatedAccount: any) => void;
		onCancel?: () => void;
	}>();

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

	// --- 各フィールドのエラーメッセージ ---
	let lastNameError = $state<string | null>(null);
	let firstNameError = $state<string | null>(null);
	let lastNameKanaError = $state<string | null>(null);
	let firstNameKanaError = $state<string | null>(null);
	let emailError = $state<string | null>(null);
	let postalCodeError = $state<string | null>(null);
	let prefectureError = $state<string | null>(null);
	let address1Error = $state<string | null>(null);
	let address2Error = $state<string | null>(null);
	let phoneError = $state<string | null>(null);

	function onsubmitForm(e: SubmitEvent) {
		e.preventDefault();

		// エラーを一旦リセット
		lastNameError =
			firstNameError =
			lastNameKanaError =
			firstNameKanaError =
			emailError =
			postalCodeError =
			prefectureError =
			address1Error =
			address2Error =
			phoneError =
				null;

		// サインアップと同じスキーマでチェック
		const result = signupSchema.safeParse({
			lastName,
			firstName,
			lastNameKana,
			firstNameKana,
			email,
			postalCode,
			prefecture,
			address1,
			address2,
			phoneNumber: phone, // スキーマ側は phoneNumber なのでここで変換
			password: 'dummy1234', // スキーマ互換のためのダミー値
			passwordConfirm: 'dummy1234'
		});

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const path = issue.path[0];
				const message = issue.message;
				switch (path) {
					case 'lastName':
						lastNameError = message;
						break;
					case 'firstName':
						firstNameError = message;
						break;
					case 'lastNameKana':
						lastNameKanaError = message;
						break;
					case 'firstNameKana':
						firstNameKanaError = message;
						break;
					case 'email':
						emailError = message;
						break;
					case 'postalCode':
						postalCodeError = message;
						break;
					case 'prefecture':
						prefectureError = message;
						break;
					case 'address1':
						address1Error = message;
						break;
					case 'address2':
						address2Error = message;
						break;
					case 'phoneNumber':
						phoneError = message;
						break;
				}
			});
			return; // ← バリデーションNGなら保存せず終了
		}

		// バリデーションOKなら親に保存イベントを渡す
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
					<FormInput
						id="account-last-name"
						label="姓"
						type="text"
						bind:value={lastName}
						error={lastNameError}
					/>
					<FormInput
						id="account-first-name"
						label="名"
						type="text"
						bind:value={firstName}
						error={firstNameError}
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<FormInput
						id="account-last-name-kana"
						label="姓(カナ)"
						type="text"
						bind:value={lastNameKana}
						error={lastNameKanaError}
					/>
					<FormInput
						id="account-first-name-kana"
						label="名(カナ)"
						type="text"
						bind:value={firstNameKana}
						error={firstNameKanaError}
					/>
				</div>

				<FormInput
					id="account-email"
					label="メールアドレス"
					type="email"
					bind:value={email}
					error={emailError}
				/>
				<FormInput
					id="account-postal-code"
					label="郵便番号"
					type="text"
					bind:value={postalCode}
					error={postalCodeError}
				/>
				<SelectPrefecture id="account-prefecture" bind:value={prefecture} error={prefectureError} />
				<FormInput
					id="account-address1"
					label="住所１"
					type="text"
					bind:value={address1}
					error={address1Error}
				/>
				<FormInput
					id="account-address2"
					label="住所２"
					type="text"
					bind:value={address2}
					error={address2Error}
				/>
				<FormInput
					id="account-phone"
					label="電話番号"
					type="text"
					bind:value={phone}
					error={phoneError}
				/>

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
