<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import AddressCard from './AddressCard.svelte';
	import AddressEdit from './AddressEdit.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Button } from '$lib/components/ui/button';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto } from '$app/navigation';
	import { ChevronLeft } from 'lucide-svelte';
	import data from '$lib/data.json';
	import type { User } from '$lib/types';

	export const pageTitle = 'ご配送先';
	let currentStepperIndex = $state(2);

	type UserFormData = Omit<User, 'id' | 'isPrimary'> & { id: string | null };

	// 配列をdata.jsonのuserから取得
	let users = $state<User[]>(data.user);

	// 選択状態
	let selectedId = $state('');

	// 初期化・更新
	$effect(() => {
		if (users.length > 0) {
			if (!selectedId || !users.some((u) => u.id === selectedId)) {
				selectedId = users[0].id;
			}
		} else {
			selectedId = '';
		}
	});

	let { paymentLink = '/cart/payment' } = $props<{ paymentLink?: string }>();

	// モーダル制御
	let showAddressModal = $state(false);

	// 編集対象
	let editingUser = $state<User | null>(null);

	function openNewAddressModal() {
		editingUser = null;
		showAddressModal = true;
	}

	function openEditAddressModal(user: User) {
		editingUser = { ...user };
		showAddressModal = true;
	}

	function handleDelete(user: User) {
		users = users.filter((u) => u.id !== user.id);
	}

	function handleModalSubmit(updated: UserFormData) {
		if (editingUser && updated.id) {
			// 編集
			const updateId = updated.id;
			users = users.map((u) => (u.id === updateId ? { ...u, ...updated, id: updateId } : u));
		} else {
			// 新規追加
			const newId = (
				users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id, 10))) + 1 : 1
			).toString();
			const newUser: User = { ...updated, id: newId };
			users = [...users, newUser];
			selectedId = newUser.id;
		}
		showAddressModal = false;
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col justify-center pt-4 md:mx-8">
		<div class="md:max-w-2xlself-start mb-4">
			<a
				href="/cart/customer-information"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<div class="text-xs md:text-sm">前に戻る</div>
			</a>
		</div>

		<div class="mx-auto mb-4 w-full max-w-4xl md:max-w-2xl">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="md:max-w-2xlflex mb-2 flex-row items-center gap-8 md:mb-4">
			<div class="text-base md:text-xl">{pageTitle}</div>
		</div>

		<div class="flex w-full flex-col items-center gap-6">
			<div class="flex w-full max-w-3xl flex-col items-start gap-4">
				<div class="w-full max-w-xl">
					<RadioGroup.Root bind:value={selectedId}>
						{#each users as u (u.id)}
							<AddressCard user={u} onEdit={openEditAddressModal} onDelete={handleDelete} />
						{/each}
					</RadioGroup.Root>
				</div>

				<div class="flex w-full justify-center pt-4">
					<Button
						variant="outline"
						class="w-full cursor-pointer text-gray-600 md:w-72"
						onclick={openNewAddressModal}
					>
						新しい配送先を追加
					</Button>
				</div>
			</div>

			<Separator class="max-w-3xl" />

			<div class="flex w-full max-w-3xl flex-col gap-4">
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
			{editingUser}
			onSave={handleModalSubmit}
			onCancel={() => (showAddressModal = false)}
		/>
	</Dialog.Content>
</Dialog.Root>
