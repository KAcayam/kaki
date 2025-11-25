<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { TriangleAlert } from 'lucide-svelte';

	let { open = $bindable(false), targetName = '', onConfirm, onCancel = () => {} } = $props();

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
	}
</script>

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	<Dialog.Content class="w-96">
		<Dialog.Header>
			<div class="mt-4 ml-6 flex items-center gap-2">
				<TriangleAlert class="h-6 w-6 text-yellow-500" />
				<Dialog.Description class="text-start text-sm text-gray-600">
					注文番号 {targetName}<br />注文を取り消しますか？
				</Dialog.Description>
			</div>
		</Dialog.Header>

		<div class="mx-auto flex flex-col gap-4 py-4">
			<Button class="w-72 bg-blue-500 hover:bg-blue-600" onclick={handleConfirm}>取り消す</Button>
			<Button class="w-72 text-gray-600" variant="outline" onclick={handleCancel}>
				キャンセル
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
