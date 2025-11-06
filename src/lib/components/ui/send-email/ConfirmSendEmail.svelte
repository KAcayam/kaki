<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Send } from 'lucide-svelte';

	let {
		email,
		subject,
		message,
		onCancel = () => {},
		onSend = () => {}
	} = $props<{
		email: string;
		subject: string;
		message: string;
		onCancel?: () => void;
		onSend?: () => void;
	}>();

	function handleSend() {
		onSend();
	}
	function handleCancel() {
		onCancel();
	}
</script>

<Card.Root class="mx-auto w-full max-w-md border-0 shadow-none">
	<Card.Header>
		<div class="flex items-center gap-2">
			<Send class="h-6 w-6 text-gray-500" />
			<Card.Description>下記の内容で送信しますか？</Card.Description>
		</div>
	</Card.Header>

	<Card.Content class="space-y-4">
		<div>
			<h4 class="text-sm text-gray-500">メールアドレス</h4>
			<p class="text-gray-700">{email}</p>
		</div>
		<div>
			<h4 class="text-sm text-gray-500">件名</h4>
			<p class="text-gray-700">{subject}</p>
		</div>
		<div>
			<h4 class="text-sm text-gray-500">お問い合わせ内容</h4>
			<p class="whitespace-pre-wrap text-gray-700">{message}</p>
		</div>

		<div class="mx-auto flex flex-col gap-4 py-4">
			<Button class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600" onclick={handleSend}
				>送信</Button
			>
			<Button class="w-72 cursor-pointer text-gray-600" variant="outline" onclick={handleCancel}>
				キャンセル
			</Button>
		</div>
	</Card.Content>
</Card.Root>
