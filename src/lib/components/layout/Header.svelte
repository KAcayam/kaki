<script lang="ts">
	import { ShoppingCart } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<header class="w-full border-b border-gray-200 bg-white">
	<div class="flex items-center justify-between px-4 py-2">
		<!-- 左側: サイト名 -->
		<span class="font-middle text-xl">新鮮な牡蠣販売所</span>

		<!-- 右側: カートアイコンとログインボタン -->
		<div class="flex items-center gap-4">
			<Button variant="ghost" class="!p-0">
				<ShoppingCart class="!h-7 !w-7" />
			</Button>
			<Button variant="outline" class="rounded-full text-gray-600"
				><a href="/login">ログイン</a></Button
			>
		</div>
	</div>
</header>
