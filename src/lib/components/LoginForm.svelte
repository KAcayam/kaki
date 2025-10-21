<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import FormPassword from '$lib/components/form-base/FormPassword.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { FieldSeparator } from '$lib/components/ui/field/index.js';
	import { loginSchema } from '$lib/schemas/auth';

	let email = '';
	let password = '';

	let emailError: string | null = null;
	let passwordError: string | null = null;

	function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		// zodでバリデーション
		const result = loginSchema.safeParse({ email, password });
		emailError = null;
		passwordError = null;

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				if (issue.path[0] === 'email') emailError = issue.message;
				if (issue.path[0] === 'password') passwordError = issue.message;
			});
			return;
		}
		// バリデーションが成功した場合
		const validatedData = result.data;
		// ここでAPIに送信するなどの処理を行う
	}
</script>

<div class="flex flex-col items-center gap-4">
	<!-- ログインカード -->
	<Card.Root class="w-full max-w-sm">
		<Card.Content>
			<form class="flex w-full max-w-sm flex-col gap-6" onsubmit={onSubmit} novalidate>
				<div>
					<Button variant="outline" type="button" class="w-full">
						Sign in with Googleのロゴ付きボタン
					</Button>
				</div>
				<FieldSeparator>もしくは</FieldSeparator>

				<FormInput
					id="login-email"
					label="Email"
					type="email"
					placeholder="メールアドレス"
					bind:value={email}
					error={emailError}
				/>

				<FormPassword
					id="login-password"
					label="Password"
					placeholder="パスワード"
					bind:value={password}
					error={passwordError}
				/>

				<div>
					<a href="##" class="ml-auto text-sm text-gray-500">パスワードを忘れた場合</a>
				</div>

				<div class="flex items-center justify-between">
					<Button type="submit" class="w-full bg-blue-500 hover:bg-blue-600">ログイン</Button>
				</div>
			</form>
		</Card.Content>
	</Card.Root>

	<div class="w-full max-w-sm px-6 pt-4">
		<a href="/signup">
			<Button variant="outline" class="w-full text-gray-600">新規登録</Button>
		</a>
	</div>
</div>
