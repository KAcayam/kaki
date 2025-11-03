<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import SendEmail from '$lib/components/ui/SendEmail.svelte';
	import TermsOfService from '$lib/components/briefcase/TermsOfService.svelte';
	import PrivacyPolicy from '../briefcase/PrivacyPolicy.svelte';
	import Commerce from '../briefcase/Commerce.svelte';

	let showSendEmailModal = $state(false);
	let showTermsOfServiceModal = $state(false);
	let showPrivacyPolicyModal = $state(false);
	let showCommerceModal = $state(false);

	function openModal() {
		showSendEmailModal = true;
		showTermsOfServiceModal = true;
		showPrivacyPolicyModal = true;
		showCommerceModal = true;
	}

	function closeModal() {
		showSendEmailModal = false;
	}
</script>

<footer class="mt-8 w-full border-t border-gray-200">
	<div class="container mx-auto flex flex-col items-center gap-2 px-4 pt-4">
		<nav class="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
			<Dialog.Root bind:open={showSendEmailModal}>
				<Dialog.Trigger>
					<span class="cursor-pointer">お問い合わせ</span>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[90vh] max-w-md overflow-y-auto p-6">
					<SendEmail bind:open={showSendEmailModal} />
				</Dialog.Content>
			</Dialog.Root>

			<Dialog.Root bind:open={showTermsOfServiceModal}>
				<Dialog.Trigger>
					<span class="cursor-pointer">利用規約</span>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[90vh] max-w-md p-6">
					<TermsOfService />
				</Dialog.Content>
			</Dialog.Root>

			<Dialog.Root bind:open={showPrivacyPolicyModal}>
				<Dialog.Trigger>
					<span class="cursor-pointer">個人情報保護方針</span>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[90vh] max-w-md p-6">
					<PrivacyPolicy />
				</Dialog.Content>
			</Dialog.Root>

			<Dialog.Root bind:open={showCommerceModal}>
				<Dialog.Trigger>
					<span class="cursor-pointer">特定商取引法上の表記</span>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[90vh] max-w-md p-6">
					<Commerce />
				</Dialog.Content>
			</Dialog.Root>
		</nav>
		<div class="my-2 text-xs text-gray-400">©︎Oyster Company. All Rights Reserved.</div>
	</div>
</footer>
