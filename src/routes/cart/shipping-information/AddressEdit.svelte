<script lang="ts">
	import FormInput from '$lib/components/form-base/FormInput.svelte';
	import SelectPrefecture from '$lib/components/form-base/SelectPrefecture.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { addressSchema } from '$lib/schemas/auth';

	type User = {
		id: string;
		isPrimary?: boolean;
		lastName: string;
		firstName: string;
		lastNameKana: string;
		firstNameKana: string;
		email?: string;
		postalCode: string;
		prefecture: string;
		address1: string;
		address2: string;
		phone: string;
		receiveCampaignEmails: boolean;
	};
	type UserFormData = Omit<User, 'id' | 'isPrimary'> & { id: string | null };

	let {
		editingUser = null,
		onSave = (_updatedUser: UserFormData) => {},
		onCancel = () => {}
	} = $props<{
		editingUser?: User | null;
		onSave?: (updatedUser: UserFormData) => void;
		onCancel?: () => void;
	}>();

	// フォームの状態
	let lastName = $state(editingUser?.lastName || '');
	let firstName = $state(editingUser?.firstName || '');
	let postalCode = $state(editingUser?.postalCode || '');
	let prefecture = $state(editingUser?.prefecture || '');
	let address1 = $state(editingUser?.address1 || '');
	let address2 = $state(editingUser?.address2 || '');
	let phoneNumber = $state(editingUser?.phone || '');

	let lastNameError = $state<string | null>(null);
	let firstNameError = $state<string | null>(null);
	let postalCodeError = $state<string | null>(null);
	let prefectureError = $state<string | null>(null);
	let address1Error = $state<string | null>(null);
	let address2Error = $state<string | null>(null);
	let phoneNumberError = $state<string | null>(null);

	// editingUser が変わったらフォームを更新
	$effect(() => {
		if (editingUser) {
			lastName = editingUser.lastName;
			firstName = editingUser.firstName;
			postalCode = editingUser.postalCode;
			prefecture = editingUser.prefecture;
			address1 = editingUser.address1;
			address2 = editingUser.address2;
			phoneNumber = editingUser.phone;
		} else {
			lastName = '';
			firstName = '';
			postalCode = '';
			prefecture = '';
			address1 = '';
			address2 = '';
			phoneNumber = '';
		}

		lastNameError = null;
		firstNameError = null;
		postalCodeError = null;
		prefectureError = null;
		address1Error = null;
		address2Error = null;
		phoneNumberError = null;
	});

	function onsubmitForm(e: SubmitEvent) {
		e.preventDefault();

		// エラーリセット
		lastNameError = null;
		firstNameError = null;
		postalCodeError = null;
		prefectureError = null;
		address1Error = null;
		address2Error = null;
		phoneNumberError = null;

		const result = addressSchema.safeParse({
			lastName,
			firstName,
			postalCode,
			prefecture,
			address1,
			address2,
			phoneNumber
		});

		if (!result.success) {
			result.error.issues.forEach((issue) => {
				const path = issue.path[0];
				const message = issue.message;
				switch (path) {
					case 'lastName':
						lastNameError = message;
						break;
					case 'firstName':
						firstNameError = message;
						break;
					case 'postalCode':
						postalCodeError = message;
						break;
					case 'prefecture':
						prefectureError = message;
						break;
					case 'address1':
						address1Error = message;
						break;
					case 'address2':
						address2Error = message;
						break;
					case 'phoneNumber':
						phoneNumberError = message;
						break;
				}
			});
			return;
		}

		// 成功時に親に渡す
		onSave({
			id: editingUser?.id || null,
			lastName,
			firstName,
			postalCode,
			prefecture,
			address1,
			address2,
			phone: phoneNumber
		});
	}

	function handleCancel() {
		onCancel();
	}
</script>

<div class="flex flex-col items-center gap-4">
	<ScrollArea class="max-h-[70vh]">
		<Card.Root class="w-full max-w-md border-0 shadow-none">
			<Card.Header>
				<Card.Title class="text-gray-600">
					{editingUser ? '配送先を編集' : '新しい配送先'}
				</Card.Title>
			</Card.Header>
			<Card.Content class="max-h-[90vh] overflow-y-auto">
				<form class="flex flex-col gap-6" onsubmit={onsubmitForm} novalidate>
					<div class="grid grid-cols-2 gap-4">
						<FormInput
							id="guest-last-name"
							label="姓"
							type="text"
							placeholder="名前(姓)"
							bind:value={lastName}
							error={lastNameError}
						/>
						<FormInput
							id="guest-first-name"
							label="名"
							type="text"
							placeholder="名前(名)"
							bind:value={firstName}
							error={firstNameError}
						/>
					</div>

					<FormInput
						id="guest-postal-code"
						label="郵便番号"
						type="text"
						placeholder="ハイフンなし"
						bind:value={postalCode}
						error={postalCodeError}
					/>

					<SelectPrefecture
						id="guest-prefecture"
						label="都道府県"
						bind:value={prefecture}
						error={prefectureError}
					/>

					<FormInput
						id="guest-address1"
						label="住所１"
						type="text"
						placeholder="市区町村・番地"
						bind:value={address1}
						error={address1Error}
					/>

					<FormInput
						id="guest-address2"
						label="住所２"
						type="text"
						placeholder="建物名・部屋番号はこちら"
						bind:value={address2}
						error={address2Error}
					/>

					<FormInput
						id="guest-phone-number"
						label="電話番号"
						type="text"
						placeholder="ハイフンなし"
						bind:value={phoneNumber}
						error={phoneNumberError}
					/>

					<div class="mt-4 flex flex-col items-center gap-3">
						<Button type="submit" class="w-72 cursor-pointer bg-blue-500 hover:bg-blue-600">
							登録
						</Button>
						<Button
							type="button"
							variant="outline"
							onclick={handleCancel}
							class="w-72 cursor-pointer text-gray-600">キャンセル</Button
						>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</ScrollArea>
</div>
