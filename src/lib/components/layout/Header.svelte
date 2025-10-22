<script lang="ts">
	import { ShoppingCart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	// ログイン状態を擬似的に管理するための変数 (実際はDBなどから取得)
	// UI開発のためにログインボタンと併記
	let isLoggedIn = true;
	let userName = '田中太郎様';
</script>

<header class="w-full border-b border-gray-200 bg-white">
	<div class="flex items-center justify-between px-4 py-2">
		<span class="font-middle text-xl">新鮮な牡蠣販売所</span>

		<div class="flex items-center gap-6">
			<Button variant="ghost" class="!p-0">
				<ShoppingCart class="!h-7 !w-7" />
			</Button>

			<!-- ログインロジック実装のとき用
			{#if isLoggedIn}
      -->
			<!-- ログイン中の場合: ユーザー名とドロップダウンメニューを表示 -->
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="cursor-pointer text-sm text-gray-700 hover:text-gray-900">
					{userName}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-48">
					<DropdownMenu.Item onclick={() => console.log('アカウント編集ページへ遷移')}>
						アカウント編集
					</DropdownMenu.Item>
					<DropdownMenu.Item onclick={() => console.log('ログアウト処理を実行')}>
						ログアウト
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<!-- ログインロジック実装のとき用
			{:else}
      -->
			<!-- 未ログインの場合: ログインボタンを表示 -->
			<Button variant="outline" class="rounded-full text-gray-600">
				<a href="/login">ログイン</a>
			</Button>
			<!-- ログインロジック実装のとき用
			{/if}
      -->
		</div>
	</div>
</header>
