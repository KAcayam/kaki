<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import FormPassword from '$lib/components/form-base/FormPassword.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { FieldSeparator } from '$lib/components/ui/field/index.js';
	import { signupSchema } from '$lib/schemas/auth';

	// フォームのデータバインディング用
	let email = '';
	let password = '';
	let passwordConfirm = '';
	let lastName = '';
	let firstName = '';
	let lastNameKana = '';
	let firstNameKana = '';
	let postalCode = '';
	let prefecture = '';
	let address1 = '';
	let address2 = '';
	let phoneNumber = '';
	let receiveCampaignEmails = true;

	// エラーメッセージ
	let emailError: string | null = null;
	let passwordError: string | null = null;
	let passwordConfirmError: string | null = null;
	let lastNameError: string | null = null;
	let firstNameError: string | null = null;
	let lastNameKanaError: string | null = null;
	let firstNameKanaError: string | null = null;
	let postalCodeError: string | null = null;
	let prefectureError: string | null = null;
	let address1Error: string | null = null;
	let address2Error: string | null = null;
	let phoneNumberError: string | null = null;

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();

		// エラーリセット
		emailError = null;
		passwordError = null;
		passwordConfirmError = null;
		lastNameError = null;
		firstNameError = null;
		lastNameKanaError = null;
		firstNameKanaError = null;
		postalCodeError = null;
		prefectureError = null;
		address1Error = null;
		address2Error = null;
		phoneNumberError = null;

		const result = signupSchema.safeParse({
			email,
			password,
			passwordConfirm,
			lastName,
			firstName,
			lastNameKana,
			firstNameKana,
			postalCode,
			prefecture,
			address1,
			address2,
			phoneNumber
		});

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const path = issue.path[0];
				const message = issue.message;
				switch (path) {
					case 'email':
						emailError = message;
						break;
					case 'password':
						passwordError = message;
						break;
					case 'passwordConfirm':
						passwordConfirmError = message;
						break;
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
				}
			});
			return;
		}

		console.log('--- 登録データ ---', result.data);
		alert('登録処理が実行されました（実際にはAPI通信などを行います）');
	}
</script>

<div class="flex flex-col items-center gap-4">
	<Card.Root class="w-full max-w-3xl">
		<Card.Content>
			<form class="flex flex-col gap-6" {onsubmit} novalidate>
				<FormInput
					id="signup-email"
					label="メールアドレス"
					type="email"
					placeholder="メールアドレス"
					bind:value={email}
					error={emailError}
					required={true}
				/>

				<FormPassword
					id="signup-password"
					label="パスワード"
					placeholder="半角英数字で8文字以上"
					bind:value={password}
					error={passwordError}
					required={true}
				/>

				<FormPassword
					id="signup-password-confirm"
					label="パスワード(確認)"
					placeholder="確認のためもう一度入力してください"
					bind:value={passwordConfirm}
					error={passwordConfirmError}
					required={true}
				/>

				<FieldSeparator />

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormInput
						id="signup-last-name"
						label="姓"
						type="text"
						placeholder="名前(姓)"
						bind:value={lastName}
						error={lastNameError}
						required={true}
					/>
					<FormInput
						id="signup-first-name"
						label="名"
						type="text"
						placeholder="名前(名)"
						bind:value={firstName}
						error={firstNameError}
						required={true}
					/>
				</div>

				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormInput
						id="signup-last-name-kana"
						label="姓(カナ)"
						type="text"
						placeholder="ナマエ(姓)"
						bind:value={lastNameKana}
						error={lastNameKanaError}
						required={true}
					/>
					<FormInput
						id="signup-first-name-kana"
						label="名(カナ)"
						type="text"
						placeholder="ナマエ(名)"
						bind:value={firstNameKana}
						error={firstNameKanaError}
						required={true}
					/>
				</div>

				<FormInput
					id="signup-postal-code"
					label="郵便番号"
					type="text"
					placeholder="ハイフンなし"
					bind:value={postalCode}
					error={postalCodeError}
					required={true}
				/>

				<!-- 都道府県 -->
				<SelectPrefecture
					id="signup-prefecture"
					label="都道府県"
					bind:value={prefecture}
					error={prefectureError}
					required={true}
				/>

				<FormInput
					id="signup-address1"
					label="住所１"
					type="text"
					placeholder="市区町村・番地"
					bind:value={address1}
					error={address1Error}
					required={true}
				/>

				<FormInput
					id="signup-address2"
					label="住所２"
					type="text"
					placeholder="建物名・部屋番号はこちら"
					bind:value={address2}
					error={address2Error}
				/>

				<FormInput
					id="signup-phone-number"
					label="電話番号"
					type="text"
					placeholder="ハイフンなし"
					bind:value={phoneNumber}
					error={phoneNumberError}
					required={true}
				/>

				<div class="flex items-center gap-3">
					<input
						id="campaign"
						type="checkbox"
						class="h-4 w-4"
						bind:checked={receiveCampaignEmails}
					/>
					<label for="campaign">キャンペーンメールを受信する</label>
				</div>

				<div class="flex flex-col gap-3">
					<Button type="submit" class="w-full bg-blue-500 font-bold text-white hover:bg-blue-600">
						登録
					</Button>
					<a href="/login">
						<Button type="button" variant="outline" class="w-full font-bold text-gray-600">
							キャンセル
						</Button>
					</a>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
