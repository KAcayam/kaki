<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import ContactModal from '$lib/components/ui/send-email/ContactModal.svelte';
	import TermsOfService from '$lib/components/briefcase/TermsOfService.svelte';
	import PrivacyPolicy from '../briefcase/PrivacyPolicy.svelte';
	import Commerce from '../briefcase/Commerce.svelte';

	let showContactModal = $state(false);
	let showTermsOfServiceModal = $state(false);
	let showPrivacyPolicyModal = $state(false);
	let showCommerceModal = $state(false);
</script>

<footer class="mt-8 w-full border-t border-gray-200">
	<div class="container mx-auto flex flex-col items-center gap-2 px-4 pt-4">
		<nav
			class="flex flex-col items-center gap-2 text-xs text-gray-500 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 md:text-sm"
		>
			<Dialog.Root bind:open={showContactModal}>
				<Dialog.Trigger>
					<span class="cursor-pointer">お問い合わせ</span>
				</Dialog.Trigger>
				<Dialog.Content class="max-h-[90vh] max-w-md overflow-y-auto p-6">
					<ContactModal bind:open={showContactModal} />
				</Dialog.Content>
			</Dialog.Root>

			<!-- smより小さい時にこのグループが下の段に来るように変更 -->
			<div class="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-8">
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
			</div>
		</nav>
		<div class="my-2 text-xs text-gray-400">©︎Oyster Company. All Rights Reserved.</div>
	</div>
</footer>
