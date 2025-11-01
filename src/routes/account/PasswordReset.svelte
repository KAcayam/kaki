<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import FormPassword from '$lib/components/form-base/FormPassword.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { FieldSeparator } from '$lib/components/ui/field/index.js';
	import { signupSchema } from '$lib/schemas/auth';
	import { goto } from '$app/navigation';

	let password = $state('');
	let passwordConfirm = $state('');

	// エラーメッセージ
	let passwordError = $state<string | null>(null);
	let passwordConfirmError = $state<string | null>(null);

	let { onCancel = () => {} } = $props<{
		onCancel?: () => void;
	}>();

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

<div class="flex flex-col items-center gap-4">
	<Card.Root class="w-full max-w-md border-0 shadow-none">
		<Card.Content>
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
