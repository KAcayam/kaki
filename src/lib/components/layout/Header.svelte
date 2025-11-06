<script lang="ts">
	import { ShoppingCart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { isLoggedIn, logout, userName } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { User, LogOut } from 'lucide-svelte';

	let { accountEditLink = '/account' } = $props<{ accountEditLink?: string }>();
	// カート内のアイテム数（仮の定数）
	const cartItemCount = 1;
</script>

<header class="w-full border-b border-gray-200 bg-white">
	<div class="flex items-center justify-between px-4 py-2">
		<a href="/" class="cursor-pointer">
			<span class="font-middle text-xl">新鮮な牡蠣販売所</span>
		</a>

		<div class="flex items-center gap-4">
			<div class="relative">
				<Button variant="ghost" class="cursor-pointer !p-0" onclick={() => goto('/cart')}>
					<ShoppingCart class="!h-7 !w-7" />
				</Button>
				{#if cartItemCount > 0}
					<Badge
						variant="destructive"
						class="absolute -top-0 -right-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-xs"
					>
						{cartItemCount}
					</Badge>
				{/if}
			</div>

			<div>
				{#if $isLoggedIn}
					<!-- ログイン中の場合: ユーザー名とドロップダウンメニューを表示 -->
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="cursor-pointer text-sm text-gray-700">
							{$userName ?? 'ゲスト'}様
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="text-gray-700">
							<DropdownMenu.Item class="cursor-pointer" onclick={() => goto(accountEditLink)}>
								<User class="h-4 w-4" />
								<span>アカウント</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item class="cursor-pointer" onclick={logout}>
								<LogOut class="h-4 w-4" />
								<span>ログアウト</span>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<!-- 未ログインの場合: ログインボタンを表示 -->
					<Button
						variant="outline"
						class="cursor-pointer rounded-full text-gray-600"
						onclick={() => goto('/login')}
					>
						ログイン
					</Button>
				{/if}
			</div>
		</div>
	</div>
</header>
