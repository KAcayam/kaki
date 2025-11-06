<script lang="ts">
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Card from '$lib/components/ui/card';
	import { Phone } from 'lucide-svelte';
	import { toast } from 'svelte-sonner';
	import MailForm from './MailForm.svelte';
	import ConfirmSendEmail from './ConfirmSendEmail.svelte';

	let { open = $bindable() } = $props<{ open: boolean }>();

	type ContactStep = 'input' | 'confirm';
	let currentStep: ContactStep = $state('input');

	// 入力されたデータの一時保存用
	let formData = $state<{ email: string; subject: string; message: string } | null>(null);

	function handleFormSubmit(data: { email: string; subject: string; message: string }) {
		formData = data;
		currentStep = 'confirm';
	}

	function handleConfirmCancel() {
		currentStep = 'input';
	}

	function handleConfirmSend() {
		toast.success('お問い合わせを送信しました');
		open = false;
	}
</script>

<ScrollArea class="max-h-[70vh]">
	{#if currentStep === 'input'}
		<!-- on:submitForm ではなく onsubmitForm に直接関数を渡す -->
		<MailForm onSubmitForm={handleFormSubmit} />

		<Separator class="my-6" />

		<Card.Root class="mx-auto w-full max-w-md border-0 shadow-none">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Phone class="h-5 w-5 text-gray-600" />
					<span class="text-gray-600">お電話でお問い合わせ</span>
				</Card.Title>
				<Card.Description>
					下記時間帯でも応対できない場合がありますこと、ご了承お願いいたします。
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<span class="text-gray-700">【平日11:00-17:00】0123-45-6789</span>
			</Card.Content>
		</Card.Root>
	{:else if currentStep === 'confirm' && formData}
		<!-- on:Cancel ではなく onCancel に直接関数を渡す -->
		<!-- on:Send ではなく onSend に直接関数を渡す -->
		<ConfirmSendEmail
			email={formData.email}
			subject={formData.subject}
			message={formData.message}
			onCancel={handleConfirmCancel}
			onSend={handleConfirmSend}
		/>
	{/if}
</ScrollArea>
