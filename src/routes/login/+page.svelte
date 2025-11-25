<script lang="ts">
	import LoginForm from '$lib/components/account/LoginForm.svelte';
	import { ChevronLeft } from 'lucide-svelte';

	export let pageTitle = 'ログイン';
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col items-center justify-center pt-4 md:mx-8">
		<!-- 戻るボタン -->
		<div class="mb-2 self-start md:mb-4">
			<a
				href="/"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">TOPに戻る</span>
			</a>
		</div>
		<!-- タイトル -->
		<h1 class="mb-6 self-start text-base md:text-xl">{pageTitle}</h1>
		<!-- フォームパネル -->
		<div class="flex w-full flex-col gap-6 md:max-w-sm">
			<LoginForm signupLink="/signup" />
		</div>
	</div>
</div>
