<script lang="ts">
	import FormPassword from '$lib/components/form-base/FormPassword.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { passwordChangeSchema } from '$lib/schemas/auth';

	let password = $state('');
	let passwordConfirm = $state('');

	// エラーメッセージ
	let passwordError = $state<string | null>(null);
	let passwordConfirmError = $state<string | null>(null);

	// 親コンポーネントから受け取る props
	let { onCancel = () => {}, onSave = (newPassword: string, confirmPassword: string) => {} } =
		$props<{
			onCancel?: () => void;
			onSave?: (newPassword: string, confirmPassword: string) => void;
		}>();

	function onsubmit(e: SubmitEvent) {
		e.preventDefault();

		// エラーリセット
		passwordError = null;
		passwordConfirmError = null;

		const result = passwordChangeSchema.safeParse({
			// passwordChangeSchema を使用
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

		// バリデーションが成功したら、親コンポーネントの onSave を呼び出す
		onSave(password, passwordConfirm);
	}

	function handleCancel() {
		onCancel();
	}
</script>

<div class="flex w-full max-w-sm">
	<Card.Root class="w-full shadow-none">
		<Card.Header><Card.Description>パスワードを変更する</Card.Description></Card.Header>
		<Card.Content>
			<form class="flex flex-col gap-6" {onsubmit} novalidate>
				<FormPassword
					id="reset-password"
					label="新しいパスワード"
					placeholder="半角英数字で8文字以上"
					bind:value={password}
					error={passwordError}
					required={true}
				/>

				<FormPassword
					id="reset-password-confirm"
					label="新しいパスワード(確認)"
					placeholder="確認のためもう一度入力してください"
					bind:value={passwordConfirm}
					error={passwordConfirmError}
					required={true}
				/>

				<div class="mt-4 flex flex-col gap-3">
					<Button
						type="submit"
						class="w-full cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
					>
						更新
					</Button>
					<Button
						type="button"
						variant="outline"
						onclick={handleCancel}
						class="w-full cursor-pointer text-gray-600"
					>
						キャンセル
					</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</div>
