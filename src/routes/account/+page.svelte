<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const user = {
		fullName: '田中太郎',
		fullNameKana: 'タナカタロウ',
		postal: '1010034',
		prefecture: '東京都',
		address1: '中央区銀座1-1-1',
		address2: 'パーク銀座101',
		phone: '05022334455',
		email: 'kaki@oystar.kaki',
		receiveCampaign: true
	};
</script>

<svelte:head>
	<title>アカウント情報 - 新鮮な牡蠣販売所</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
	<h1 class="mb-8 text-2xl font-medium">アカウント情報</h1>

	<div class="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
		<!-- 左カラム: 詳細リスト -->
		<section>
			<div class="mb-4">
				<div class="text-sm text-gray-600">姓名</div>
				<div class="text-lg font-medium">{user.fullName}</div>
			</div>

			<div class="mb-4">
				<div class="text-sm text-gray-600">姓名(カナ)</div>
				<div class="text-lg font-medium">{user.fullNameKana}</div>
			</div>

			<div class="mb-4">
				<div class="text-sm text-gray-600">郵便番号</div>
				<div class="text-lg font-medium">{user.postal}</div>
			</div>

			<div class="mb-4">
				<div class="text-sm text-gray-600">都道府県</div>
				<div class="text-lg font-medium">{user.prefecture}</div>
			</div>

			<div class="mb-4">
				<div class="text-sm text-gray-600">住所１</div>
				<div class="text-lg font-medium">{user.address1}</div>
			</div>

			<div class="mb-4">
				<div class="text-sm text-gray-600">住所２</div>
				<div class="text-lg font-medium">{user.address2}</div>
			</div>

			<div class="mb-4">
				<div class="text-sm text-gray-600">電話番号</div>
				<div class="text-lg font-medium">{user.phone}</div>
			</div>

			<div class="mb-6">
				<div class="text-sm text-gray-600">メールアドレス</div>
				<div class="text-lg font-medium">{user.email}</div>
			</div>

			<div class="mb-8 text-sm text-gray-700">キャンペーンメールを受信する</div>

			<div class="flex max-w-md flex-col gap-3">
				<Button variant="outline" class="w-full">アカウント情報編集</Button>
				<Button variant="outline" class="w-full">パスワード変更</Button>
			</div>
		</section>

		<!-- 右カラム: 名前など上部の簡略表示（Figma と見た目合わせ） -->
		<aside class="pt-2">
			<div class="mb-6">
				<div class="text-sm text-gray-600">姓</div>
				<div class="text-lg font-medium">{user.fullName}</div>
			</div>

			<div class="mb-6">
				<div class="text-sm text-gray-600">名</div>
				<div class="text-lg font-medium">{user.fullName}</div>
			</div>

			<div class="mb-6">
				<div class="text-sm text-gray-600">姓(カナ)</div>
				<div class="text-lg font-medium">{user.fullNameKana}</div>
			</div>

			<div class="mb-6">
				<div class="text-sm text-gray-600">名(カナ)</div>
				<div class="text-lg font-medium">{user.fullNameKana}</div>
			</div>
		</aside>
	</div>
</main>
