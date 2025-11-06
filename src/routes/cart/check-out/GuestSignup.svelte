<script lang="ts">
	import FieldSeparator from '$lib/components/ui/field/field-separator.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import FormPassword from '$lib/components/form-base/FormPassword.svelte';
	import { signupSchema } from '$lib/schemas/auth';

	// 親コンポーネントからユーザー情報を受け取る
	let { user, onCancel = () => {} }: { user: any; onCancel?: () => void } = $props();

	let password = $state('');
	let passwordConfirm = $state('');
	let receiveCampaignEmails = $state(true);

	// エラーメッセージ
	let passwordError = $state<string | null>(null);
	let passwordConfirmError = $state<string | null>(null);

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();
		passwordError = null;
		passwordConfirmError = null;

		const result = signupSchema.safeParse({
			password,
			passwordConfirm
		});

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const path = issue.path[0];
				const message = issue.message;
				switch (path) {
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
	}

	function handleCancel() {
		onCancel();
	}
</script>

<ScrollArea class="max-h-[70vh]">
	<Card.Root class="w-full max-w-md border-0 shadow-none">
		<Card.Header>
			<Card.Description class="text-sm text-gray-600">以下の情報で登録します</Card.Description>
		</Card.Header>
		<Card.Content class="max-h-[90vh] overflow-y-auto">
			<div class="grid-col grid gap-4">
				<div class="flex flex-row gap-8">
					<div class="flex-1">
						<div class="text-sm text-gray-500">姓</div>
						<div class="break-all">{user.lastName}</div>
					</div>
					<div class="flex-1">
						<div class="text-sm text-gray-500">名</div>
						<div class="break-all">{user.firstName}</div>
					</div>
				</div>

				<div class="flex flex-row gap-8">
					<div class="flex-1">
						<div class="text-sm text-gray-500">姓(カナ)</div>
						<div class="break-all">{user.lastNameKana}</div>
					</div>
					<div class="flex-1">
						<div class="text-sm text-gray-500">名(カナ)</div>
						<div class="break-all">{user.firstNameKana}</div>
					</div>
				</div>

				<div class="">
					<div class="text-sm text-gray-500">メールアドレス</div>
					<div class="break-all">{user.email}</div>
				</div>

				<div class="">
					<div class="text-sm text-gray-500">郵便番号</div>
					<div class="break-all">{user.postalCode}</div>
				</div>

				<div class="">
					<div class="text-sm text-gray-500">都道府県</div>
					<div class="break-all">{user.prefecture}</div>
				</div>

				<div class="">
					<div class="text-sm text-gray-500">住所１</div>
					<div class="break-all">{user.address1}</div>
				</div>

				<div class="">
					<div class="text-sm text-gray-500">住所２</div>
					<div class="break-all">{user.address2}</div>
				</div>

				<div class="">
					<div class="text-sm text-gray-500">電話番号</div>
					<div class="break-all">{user.phoneNumber}</div>
				</div>

				<FieldSeparator />

				<form class="flex flex-col gap-6" {onsubmit} novalidate>
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

					<div class="flex items-center gap-2 pt-2">
						<input
							id="campaign"
							type="checkbox"
							class="h-4 w-4 cursor-pointer"
							bind:checked={receiveCampaignEmails}
						/>
						<label for="campaign" class="text-sm text-gray-600">キャンペーンメールを受信する</label>
					</div>

					<div class="flex flex-col items-center gap-3">
						<Button type="submit" class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600">
							確認
						</Button>
						<Button
							type="button"
							variant="outline"
							onclick={handleCancel}
							class="w-72 cursor-pointer text-gray-600">キャンセル</Button
						>
					</div>
				</form>
			</div>
		</Card.Content>
	</Card.Root>
</ScrollArea>
