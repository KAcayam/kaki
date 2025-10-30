<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { guestSchema } from '$lib/schemas/auth';
	import { goto } from '$app/navigation';

	// フォームのデータバインディング用
	// すべての変数を $state でリアクティブにする
	let lastName = $state('');
	let firstName = $state('');
	let lastNameKana = $state('');
	let firstNameKana = $state('');
	let postalCode = $state('');
	let prefecture = $state('');
	let address1 = $state('');
	let address2 = $state('');
	let phoneNumber = $state('');
	let email = $state('');
	let receiveCampaignEmails = $state(true); // boolean型も$stateで管理

	// エラーメッセージ
	let lastNameError = $state<string | null>(null);
	let firstNameError = $state<string | null>(null);
	let lastNameKanaError = $state<string | null>(null);
	let firstNameKanaError = $state<string | null>(null);
	let postalCodeError = $state<string | null>(null);
	let prefectureError = $state<string | null>(null);
	let address1Error = $state<string | null>(null);
	let address2Error = $state<string | null>(null);
	let phoneNumberError = $state<string | null>(null);
	let emailError = $state<string | null>(null);

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();

		lastNameError = null;
		firstNameError = null;
		lastNameKanaError = null;
		firstNameKanaError = null;
		postalCodeError = null;
		prefectureError = null;
		address1Error = null;
		address2Error = null;
		phoneNumberError = null;
		emailError = null;

		const result = guestSchema.safeParse({
			lastName,
			firstName,
			lastNameKana,
			firstNameKana,
			postalCode,
			prefecture,
			address1,
			address2,
			phoneNumber,
			email
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
					case 'email':
						emailError = message;
						break;
				}
			});
			return;
		}

		console.log('--- 登録データ ---', result.data);
		alert('登録処理が実行されました（実際にはAPI通信などを行います）');
	}

	let { cancelLink = '/' } = $props<{ cancelLink?: string }>();
</script>

<div class="flex flex-col items-center gap-4">
	<Card.Root class="w-full max-w-3xl">
		<Card.Content>
			<form class="flex flex-col gap-6" {onsubmit} novalidate>
				<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<FormInput
						id="guest-last-name"
						label="姓"
						type="text"
						placeholder="名前(姓)"
						bind:value={lastName}
						error={lastNameError}
						required={true}
					/>
					<FormInput
						id="guest-first-name"
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
						id="guest-last-name-kana"
						label="姓(カナ)"
						type="text"
						placeholder="ナマエ(姓)"
						bind:value={lastNameKana}
						error={lastNameKanaError}
						required={true}
					/>
					<FormInput
						id="guest-first-name-kana"
						label="名(カナ)"
						type="text"
						placeholder="ナマエ(名)"
						bind:value={firstNameKana}
						error={firstNameKanaError}
						required={true}
					/>
				</div>

				<FormInput
					id="guest-postal-code"
					label="郵便番号"
					type="text"
					placeholder="ハイフンなし"
					bind:value={postalCode}
					error={postalCodeError}
					required={true}
				/>

				<!-- 都道府県 -->
				<SelectPrefecture
					id="guest-prefecture"
					label="都道府県"
					bind:value={prefecture}
					error={prefectureError}
					required={true}
				/>

				<FormInput
					id="guest-address1"
					label="住所１"
					type="text"
					placeholder="市区町村・番地"
					bind:value={address1}
					error={address1Error}
					required={true}
				/>

				<FormInput
					id="guest-address2"
					label="住所２"
					type="text"
					placeholder="建物名・部屋番号はこちら"
					bind:value={address2}
					error={address2Error}
				/>

				<FormInput
					id="guest-phone-number"
					label="電話番号"
					type="text"
					placeholder="ハイフンなし"
					bind:value={phoneNumber}
					error={phoneNumberError}
					required={true}
				/>

				<FormInput
					id="guest-email"
					label="メールアドレス"
					type="email"
					placeholder="メールアドレス"
					bind:value={email}
					error={emailError}
					required={true}
				/>

				<div class="flex items-center gap-2">
					<input
						id="campaign"
						type="checkbox"
						class="h-4 w-4 cursor-pointer"
						bind:checked={receiveCampaignEmails}
					/>
					<label for="campaign" class="text-sm text-gray-600">キャンペーンメールを受信する</label>
				</div>

				<div class="flex flex-col gap-3">
					<Button
						type="submit"
						class="w-full cursor-pointer bg-blue-500 font-bold text-white hover:bg-blue-600"
					>
						次に進む
					</Button>
					<Button
						type="button"
						variant="outline"
						onclick={() => goto(cancelLink)}
						class="w-full cursor-pointer font-bold text-gray-600"
					>
						キャンセル
					</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
