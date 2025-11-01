<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import { Pencil, Trash2 } from 'lucide-svelte';

	// JSON の user 配列に合わせた型
	interface User {
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
	}

	let { user, onEdit, onDelete } = $props<{
		user: User;
		onEdit: (user: User) => void;
		onDelete: (user: User) => void;
	}>();
</script>

<div class="flex w-full items-center justify-between rounded-lg border border-gray-100 p-4">
	<div class="flex items-center gap-3">
		<RadioGroup.Item value={user.id} class="mt-1 mr-2 cursor-pointer" />

		<div>
			<p class="text-sm font-medium">{user.lastName}{user.firstName}</p>
			<p class="text-sm text-gray-600">〒{user.postalCode}</p>
			<p class="text-sm text-gray-600">{user.prefecture}{user.address1}{user.address2}</p>
			<p class="text-sm text-gray-600">{user.phone}</p>
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
			class="cursor-pointer text-red-500"
			variant="ghost"
			size="icon"
			onclick={() => onDelete(user)}
			aria-label="削除"
		>
			<Trash2 class="h-4 w-4" />
		</Button>
	</div>
</div>
