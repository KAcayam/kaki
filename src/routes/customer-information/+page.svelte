<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import AccountData from '$lib/components/panel/AccountData.svelte';
	import { isLoggedIn } from '$lib/stores/auth';

	// 親のレイアウトから渡されるプロパティを $props() で受け取る
	type PageProps = {
		pageTitle: string;
	};

	let { pageTitle }: PageProps = $props();
</script>

{#if $isLoggedIn}
	<!-- ストアの値を参照 -->
	<AccountData />

	<div class="mx-auto mt-6 flex w-72 flex-col items-center gap-4">
		<Button class="w-full cursor-pointer bg-blue-500 hover:bg-blue-600">次へ</Button>
		<div class="flex w-full">
			<a href="##" class="cursor-pointer text-sm text-gray-500">アカウント情報を編集する</a>
		</div>
	</div>
{:else}
	<div class="mx-auto mt-6 flex w-72 flex-col items-center gap-8">
		<a href="/customer-information/login" class="w-full">
			<Button class="w-full cursor-pointer text-gray-600" variant="outline">ログイン</Button>
		</a>
		<a href="/customer-information/guest" class="w-full">
			<Button class="w-full cursor-pointer text-gray-600" variant="outline">ゲスト購入</Button>
		</a>
		<a href="/customer-information/register" class="w-full">
			<Button class="w-full cursor-pointer text-gray-600" variant="outline">新規登録</Button>
		</a>
	</div>
{/if}
