<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Pencil, Trash2 } from 'lucide-svelte';
	import ConfirmDeleteModal from '$lib/components/ui/ConfirmDeleteModal.svelte';
	import type { User } from '$lib/types';

	let { user, onEdit, onDelete } = $props<{
		user: User;
		onEdit: (user: User) => void;
		onDelete: (user: User) => void;
	}>();

	let showDeleteModal = $state(false);

	function handleDeleteClick() {
		showDeleteModal = true;
	}

	function handleConfirmDelete() {
		onDelete(user);
		showDeleteModal = false;
	}

	function handleCancelDelete() {
		showDeleteModal = false;
	}
</script>

<div class="flex w-full items-center justify-between rounded-lg border border-gray-200 p-4">
	<div class="flex items-center gap-3">
		<RadioGroup.Item value={user.id} class="mt-1 mr-2 cursor-pointer" />

		<div>
			<p class="text-sm font-medium">{user.lastName}{user.firstName}</p>
			<p class="text-sm text-gray-600">〒{user.postalCode}</p>
			<p class="text-sm text-gray-600">{user.prefecture}{user.address1}{user.address2}</p>
			<p class="text-sm text-gray-600">{user.phoneNumber}</p>
		</div>
	</div>

	<div class="ml-2 flex items-center gap-1">
		<Button
			class="cursor-pointer"
			variant="ghost"
			size="icon"
			onclick={() => onEdit(user)}
			aria-label="編集"
		>
			<Pencil class="h-4 w-4" />
		</Button>
		<Button
			variant="ghost"
			size="icon"
			onclick={handleDeleteClick}
			aria-label="削除"
			class={`cursor-pointer text-red-500 hover:text-red-600 ${user.isPrimary ? 'invisible' : ''}`}
		>
			<Trash2 class="h-4 w-4" />
		</Button>
	</div>
</div>

<!-- 削除確認モーダル -->
<ConfirmDeleteModal
	bind:open={showDeleteModal}
	targetName={`${user.lastName}${user.firstName}`}
	onConfirm={handleConfirmDelete}
	onCancel={handleCancelDelete}
/>
