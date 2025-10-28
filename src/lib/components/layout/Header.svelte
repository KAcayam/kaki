<script lang="ts">
	import { ShoppingCart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { isLoggedIn, logout, userName } from '$lib/stores/auth';

	// カート内のアイテム数（仮の定数）
	const cartItemCount = 1;
</script>

<header class="w-full border-b border-gray-200 bg-white">
	<div class="flex items-center justify-between px-8 py-2">
		<span class="font-middle text-xl">新鮮な牡蠣販売所</span>

		<div class="flex items-center gap-6">
			<div class="relative">
				<a href="/cart">
					<Button variant="ghost" class="cursor-pointer !p-0">
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
				</a>
			</div>

			<div class="">
				{#if $isLoggedIn}
					<!-- ログイン中の場合: ユーザー名とドロップダウンメニューを表示 -->
					<DropdownMenu.Root>
						<DropdownMenu.Trigger class="cursor-pointer text-sm text-gray-700">
							{$userName ?? 'ゲスト'}様
						</DropdownMenu.Trigger>
						<DropdownMenu.Content class="w-48 text-gray-700">
							<DropdownMenu.Item
								class="cursor-pointer"
								onclick={() => console.log('アカウント編集ページへ遷移')}
							>
								アカウント編集
							</DropdownMenu.Item>
							<DropdownMenu.Item class="cursor-pointer" onclick={logout}>
								ログアウト
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				{:else}
					<!-- 未ログインの場合: ログインボタンを表示 -->
					<Button variant="outline" class="cursor-pointer rounded-full text-gray-600">
						<a href="/login">ログイン</a>
					</Button>
				{/if}
			</div>
		</div>
	</div>
</header>
