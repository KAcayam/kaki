<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import AccountData from '$lib/components/account/AccountData.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	let {
		open = $bindable(false),
		tempAccount,
		onConfirm = () => {},
		onCancel = () => {}
	} = $props();

	let closeButtonRef = $state<HTMLElement | null>(null);

	function handleConfirm() {
		onConfirm();
		open = false;
	}

	function handleCancel() {
		onCancel();
		open = false;
	}

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
		if (newOpen) {
			setTimeout(() => {
				closeButtonRef?.focus();
			}, 50);
		}
	}
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Content class="mx-auto w-full max-w-sm">
		<Dialog.Close bind:ref={closeButtonRef} class="sr-only" />
		<ScrollArea class="max-h-[70vh]">
			<Dialog.Header>
				<Dialog.Description class="px-4 text-start">以下の内容で登録しますか</Dialog.Description>
			</Dialog.Header>
			<div class="flex flex-col gap-4 p-4">
				<div class="mx-auto flex w-full max-w-sm flex-col gap-4">
					<AccountData user={tempAccount} />
					<div class="mx-auto flex w-full flex-col gap-4 pt-2 md:w-72">
						<Button
							class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600"
							onclick={handleConfirm}
						>
							登録
						</Button>
						<Button
							class="w-full cursor-pointer text-gray-600"
							variant="outline"
							onclick={handleCancel}
						>
							キャンセル
						</Button>
					</div>
				</div>
			</div>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
