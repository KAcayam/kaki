<script lang="ts">
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	let selectedPayment = $state<'card' | 'convenience' | 'bank'>('card');

	const {
		creditCardPay = '/cart/payment/credit-card',
		checkOut = '/cart/check-out',
		checkOutGuest = '/cart/check-out/guest'
	} = $props<{
		creditCardPay?: string;
		checkOut?: string;
		checkOutGuest?: string;
	}>();

	function goToCreditCardPay() {
		goto(creditCardPay);
	}

	function goToCheckOut() {
		goto(checkOut);
	}

	function goToCheckOutGuest() {
		goto(checkOutGuest);
	}
</script>

<div class="w-full rounded-lg border px-6 py-4">
	<div class="mb-4 text-sm text-gray-500">お支払い方法</div>

	<div class="mb-4 flex flex-col gap-3">
		<RadioGroup.Root bind:value={selectedPayment} class="flex flex-col gap-3">
			<div class="flex items-center gap-2">
				<RadioGroup.Item id="card" value="card" class="cursor-pointer" />
				<Label for="card" class="text-gray-700">クレジットカード</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroup.Item id="convenience" value="convenience" class="cursor-pointer" />
				<Label for="convenience" class="text-gray-700">コンビニ決済</Label>
			</div>
			<div class="flex items-center gap-2">
				<RadioGroup.Item id="bank" value="bank" class="cursor-pointer" />
				<Label for="bank" class="text-gray-700">銀行振込</Label>
			</div>
		</RadioGroup.Root>
	</div>

	{#if selectedPayment === 'card'}
		<div class="flex flex-col gap-3 rounded-lg border px-5 py-4">
			<div>
				<Label class="block text-sm text-gray-600">カード番号</Label>
				<Input type="text" placeholder="1234 1234 5678 5678" class="mt-1 w-full" />
			</div>
			<div class="flex gap-2">
				<div class="flex-1">
					<Label class="block text-sm text-gray-600">有効期限</Label>
					<Input type="text" placeholder="MM/YY" class="mt-1 w-full" />
				</div>
				<div class="flex-1">
					<Label class="block text-sm text-gray-600">CVC</Label>
					<Input type="text" placeholder="123" class="mt-1 w-full" />
				</div>
			</div>
			<Button class="mt-4 w-full cursor-pointer bg-blue-500 hover:bg-blue-600">支払う</Button>
		</div>
	{/if}

	{#if selectedPayment === 'convenience'}
		<div class="rounded-lg border px-5 py-4 text-gray-600">
			<div class="text-gray-500">
				バーコードや番号など
				<p class="text-sm text-blue-400">ケースサンプル→</p>
				<p class="text-sm text-blue-400">ログイン済みでの完了画面へ</p>
			</div>
			<Button class="mt-4 w-full cursor-pointer bg-blue-500 hover:bg-blue-600">購入する</Button>
			<div class="pt-2 text-xs text-gray-500">※出荷は入金が確認でき次第となります</div>
		</div>
	{/if}

	{#if selectedPayment === 'bank'}
		<div class="rounded-lg border px-5 py-4 text-gray-600">
			<div class="text-gray-600">
				オイスター銀行 牡蠣支店
				<p>普通 09876543</p>
				<p>株式会社かきフライ</p>
				<p class="text-sm text-blue-400">ケースサンプル→</p>
				<p class="text-sm text-blue-400">ゲスト購入での完了画面へ</p>
			</div>
			<Button class="mt-4 w-full cursor-pointer bg-blue-500 hover:bg-blue-600">購入する</Button>
			<div class="pt-2 text-xs text-gray-500">※出荷は入金が確認でき次第となります</div>
		</div>
	{/if}
</div>
