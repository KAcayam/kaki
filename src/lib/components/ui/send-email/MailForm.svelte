<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import { Mail } from 'lucide-svelte';
	import { contactSchema } from '$lib/schemas/auth';

	// フォーム入力
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	// エラー状態
	let emailError: string | null = $state(null);
	let subjectError: string | null = $state(null);
	let messageError: string | null = $state(null);

	let { onSubmitForm = () => {} } = $props<{
		onSubmitForm?: (data: { email: string; subject: string; message: string }) => void;
	}>();

	function handleSubmit(event: Event) {
		event.preventDefault();

		// エラー初期化
		emailError = subjectError = messageError = null;

		// バリデーション
		const result = contactSchema.safeParse({ email, subject, message });

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const path = issue.path[0];
				const msg = issue.message;
				switch (path) {
					case 'email':
						emailError = msg;
						break;
					case 'subject':
						subjectError = msg;
						break;
					case 'message':
						messageError = msg;
						break;
				}
			});
			return;
		}

		// 成功時
		onSubmitForm({ email, subject, message });
	}
</script>

<Card.Root class="mx-auto w-full max-w-md border-0 shadow-none">
	<Card.Header>
		<Card.Title class="flex items-center gap-2">
			<Mail class="h-5 w-5 text-gray-600" />
			<span class="text-gray-600">メールでお問い合わせ</span>
		</Card.Title>
		<Card.Description>
			返答にはお時間をいただく場合がございます。
			また、内容によってはご返答いたしかねる場合もありますこと、ご了承お願いいたします。
		</Card.Description>
	</Card.Header>

	<Card.Content>
		<form class="flex flex-col gap-4" onsubmit={handleSubmit}>
			<FormInput
				id="contact-email"
				label="メールアドレス"
				type="email"
				required
				placeholder="メールアドレス"
				bind:value={email}
				error={emailError}
			/>
			<FormInput
				id="contact-subject"
				label="件名"
				type="text"
				required
				placeholder="件名"
				bind:value={subject}
				error={subjectError}
			/>
			<div class="flex flex-col">
				<label for="contact-message" class="mb-1 text-sm text-gray-600">
					お問い合わせ内容 <span class="pl-1 text-red-500">*</span></label
				>
				<Textarea
					id="contact-message"
					class="rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					bind:value={message}
				/>
				{#if messageError}
					<p class="mt-1 text-sm text-red-500">{messageError}</p>
				{/if}
			</div>

			<Button
				type="submit"
				class="mx-auto mt-4 w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
			>
				入力内容の確認
			</Button>
		</form>
	</Card.Content>
</Card.Root>
