<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { signupSchema } from '$lib/schemas/auth';
	import CardDescription from '../../../lib/components/ui/card/card-description.svelte';
	import CardHeader from '../../../lib/components/ui/card/card-header.svelte';
	import FormPassword from '$lib/components/form-base/FormPassword.svelte';
	import { FieldSeparator } from '$lib/components/ui/field/index.js';

	let {
		guestUser = null,
		onSave = (_updatedAccount: any) => {},
		onCancel = () => {}
	} = $props<{
		guestUser?: any | null;
		onSave?: (updatedAccount: any) => void;
		onCancel?: () => void;
	}>();

	let lastName = $state(guestUser?.lastName || '');
	let firstName = $state(guestUser?.firstName || '');
	let lastNameKana = $state(guestUser?.lastNameKana || '');
	let firstNameKana = $state(guestUser?.firstNameKana || '');
	let email = $state(guestUser?.email || '');
	let postalCode = $state(guestUser?.postalCode || '');
	let prefecture = $state(guestUser?.prefecture || '');
	let address1 = $state(guestUser?.address1 || '');
	let address2 = $state(guestUser?.address2 || '');
	let phoneNumber = $state(guestUser?.phoneNumber || '');
	let password = $state('');
	let passwordConfirm = $state('');
	let receiveCampaignEmails = $state(guestUser?.receiveCampaignEmails || false);

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
	let phoneNumberError = $state<string | null>(null);
	let passwordError = $state<string | null>(null);
	let passwordConfirmError = $state<string | null>(null);

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
			phoneNumberError =
			passwordError =
			passwordConfirmError =
				null;

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
			phoneNumber,
			password,
			passwordConfirm
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
						phoneNumberError = message;
						break;
					case 'password':
						passwordError = message;
						break;
					case 'passwordConfirm':
						passwordConfirmError = message;
						break;
				}
			});
			return;
		}

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
			phoneNumber,
			password,
			receiveCampaignEmails
		});
	}
</script>

<div class="flex flex-col items-center gap-4">
	<Card.Root class="w-full max-w-sm shadow-none">
		<Card.Content>
			<form class="flex flex-col gap-6" onsubmit={onsubmitForm} novalidate>
				<FormInput
					id="account-email"
					label="メールアドレス"
					type="email"
					required
					bind:value={email}
					error={emailError}
				/>
				<FormPassword
					id="password"
					label="パスワード"
					required
					bind:value={password}
					error={passwordError}
				/>
				<FormPassword
					id="password-confirm"
					label="パスワード(確認)"
					required
					bind:value={passwordConfirm}
					error={passwordConfirmError}
				/>

				<FieldSeparator />

				<div class="grid grid-cols-2 gap-4">
					<FormInput
						id="account-last-name"
						label="姓"
						type="text"
						required
						bind:value={lastName}
						error={lastNameError}
					/>
					<FormInput
						id="account-first-name"
						label="名"
						type="text"
						required
						bind:value={firstName}
						error={firstNameError}
					/>
				</div>

				<div class="grid grid-cols-2 gap-4">
					<FormInput
						id="account-last-name-kana"
						label="姓(カナ)"
						type="text"
						required
						bind:value={lastNameKana}
						error={lastNameKanaError}
					/>
					<FormInput
						id="account-first-name-kana"
						label="名(カナ)"
						type="text"
						required
						bind:value={firstNameKana}
						error={firstNameKanaError}
					/>
				</div>

				<FormInput
					id="account-postal-code"
					label="郵便番号"
					type="text"
					required
					bind:value={postalCode}
					error={postalCodeError}
				/>
				<SelectPrefecture id="account-prefecture" bind:value={prefecture} error={prefectureError} />
				<FormInput
					id="account-address1"
					label="住所１"
					type="text"
					required
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
					id="account-phone-number"
					label="電話番号"
					type="text"
					required
					bind:value={phoneNumber}
					error={phoneNumberError}
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

				<div class="flex max-w-sm flex-col items-center gap-3 pt-4">
					<Button type="submit" class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
						>確認</Button
					>
					<Button
						type="button"
						variant="outline"
						onclick={onCancel}
						class="w-full cursor-pointer text-gray-600">キャンセル</Button
					>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
