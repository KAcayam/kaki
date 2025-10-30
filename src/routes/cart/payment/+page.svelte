<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import AddressCard from '$lib/components/panel/AddressCard.svelte';
	import AddressEdit from '$lib/components/panel/AddressEdit.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { ChevronLeft } from 'lucide-svelte';

	export const pageTitle = 'お支払い方法';
	let currentStepperIndex = $state(3);

	// AddressCardと同期した型定義
	interface Address {
		id: string;
		isPrimary?: boolean; // メイン住所フラグ
		lastName: string;
		firstName: string;
		postal_code: string;
		prefecture: string;
		address1: string;
		address2: string;
		phone: string;
	}
	type AddressFormData = Omit<Address, 'id' | 'isPrimary'> & { id: string | null };

	// 配送先のサンプルデータ
	let addresses = $state<Address[]>([
		{
			id: '1',
			isPrimary: true,
			lastName: '田中',
			firstName: '太郎',
			postal_code: '1500001',
			prefecture: '東京都',
			address1: '渋谷区神南1-1-1',
			address2: '',
			phone: '09012345678'
		},
		{
			id: '2',
			lastName: '水上',
			firstName: '花子',
			postal_code: '5400002',
			prefecture: '大阪府',
			address1: '大阪市中央区南船場1-2-3',
			address2: 'パークハイアットマンション1202',
			phone: '08098765432'
		}
	]);

	// selectedId自体はユーザーの選択によって変わる状態なので$stateを維持
	let selectedId = $state('');

	// addressesの変更（初期ロード時も含む）に反応してselectedIdを初期化・更新する
	$effect(() => {
		if (addresses.length > 0) {
			if (!selectedId || !addresses.some((a) => a.id === selectedId)) {
				selectedId = addresses[0].id;
			}
		} else {
			selectedId = '';
		}
	});

	let { paymentLink = '/payment' } = $props<{ paymentLink?: string }>();

	// モーダル制御
	let showAddressModal = $state(false);

	// editingAddressの型をAddressと同期
	let editingAddress = $state<Address | null>(null);

	function openNewAddressModal() {
		editingAddress = null; // 新規追加時はnull
		showAddressModal = true;
	}

	function openEditAddressModal(address: Address) {
		// 編集時は渡されたaddressをそのままコピーしてセット
		editingAddress = { ...address };
		showAddressModal = true;
	}

	function handleDelete(address: Address) {
		if (address.isPrimary) {
			toast.warning('アカウントご本人の住所は削除できません');
			return;
		}
		addresses = addresses.filter((a) => a.id !== address.id);
	}

	function handleModalSubmit(updated: AddressFormData) {
		if (editingAddress && updated.id) {
			// 編集の場合
			const updateId = updated.id;
			addresses = addresses.map((a) =>
				a.id === updateId ? { ...a, ...updated, id: updateId } : a
			);
		} else {
			// 新規追加
			const newId = (
				addresses.length > 0 ? Math.max(...addresses.map((a) => parseInt(a.id, 10))) + 1 : 1
			).toString();
			const newAddress: Address = { ...updated, id: newId };
			addresses = [...addresses, newAddress];
			selectedId = newAddress.id; // 新規追加したものを選択状態にする
		}
		showAddressModal = false;
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mb-4 ml-8 self-start">
			<a
				href="/customer-information"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">前に戻る</span>
			</a>
		</div>

		<div class="mx-auto mb-8 w-full max-w-4xl px-8">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="mb-6 ml-8 flex flex-row items-center gap-8">
			<div class="text-xl">{pageTitle}</div>
		</div>

		<div class="flex w-full flex-col items-center gap-6 px-4">
			<div class="w-full max-w-lg px-8">
				<RadioGroup.Root bind:value={selectedId}>
					{#each addresses as a (a.id)}
						<AddressCard address={a} onEdit={openEditAddressModal} onDelete={handleDelete} />
					{/each}
				</RadioGroup.Root>
			</div>

			<div>
				<Button
					variant="outline"
					class="w-72 cursor-pointer text-gray-600"
					onclick={openNewAddressModal}
				>
					新しい配送先を追加
				</Button>
			</div>

			<Separator class="max-w-4xl" />

			<div class="flex w-full max-w-4xl flex-col gap-4 px-8">
				<div class="flex w-full items-center gap-2">
					<Checkbox id="gift-option" class="cursor-pointer" />
					<Label for="gift-option" class="text-gray-500">ギフト用</Label>
				</div>

				<div class="flex w-full flex-col gap-2 py-2">
					<Label class="text-gray-600">備考</Label>
					<Textarea
						class="w-full"
						placeholder="ご要望などがあればこちらに記入ください。"
						id="message"
					/>
				</div>
			</div>

			<div>
				<Button
					class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600"
					onclick={() => goto(paymentLink)}>お支払いに進む</Button
				>
			</div>
		</div>
	</div>
</div>

<!-- AddressEdit モーダル -->
<Dialog.Root bind:open={showAddressModal}>
	<Dialog.Content class="w-96">
		<AddressEdit
			{editingAddress}
			onSave={handleModalSubmit}
			onCancel={() => (showAddressModal = false)}
		/>
	</Dialog.Content>
</Dialog.Root>
