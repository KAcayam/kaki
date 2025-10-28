<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';
	import { Check } from 'lucide-svelte';

	// 親コンポーネントからモーダルの開閉状態とコールバック関数を受け取る
	let {
		open,
		onProceedToCheckout = () => {},
		onContinueShopping = () => {},
		onOpenChange = (newOpen: boolean) => {}
	} = $props<{
		open: boolean;
		onProceedToCheckout?: () => void;
		onContinueShopping?: () => void;
		onOpenChange?: (newOpen: boolean) => void;
	}>();

	// 支払いへ進む
	function handleProceedToCheckoutInternal() {
		onProceedToCheckout();
		goto('/cart');
	}

	// 買い物を続ける
	function handleContinueShoppingInternal() {
		onContinueShopping();
		goto('/');
	}

	function handleDialogOpenChange(newOpen: boolean) {
		open = newOpen;
		onOpenChange(newOpen);
	}
</script>

<!-- カート追加モーダル -->
<Dialog.Root bind:open onOpenChange={handleDialogOpenChange}>
	<Dialog.Content class="w-96">
		<Dialog.Header>
			<div class="mt-4 ml-6 flex items-center gap-1">
				<Check class="h-6 w-6 text-green-500" />
				<Dialog.Title class="text-gray-600">カートに商品が追加されました</Dialog.Title>
			</div>
		</Dialog.Header>
		<div class="mx-auto flex flex-col gap-4 py-4">
			<Button
				onclick={handleProceedToCheckoutInternal}
				class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600"
			>
				支払いに進む
			</Button>
			<Button
				onclick={handleContinueShoppingInternal}
				class="w-72 cursor-pointer text-gray-600"
				variant="outline"
			>
				買い物を続ける
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
