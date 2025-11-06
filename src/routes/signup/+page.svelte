<script lang="ts">
	import SignupForm from '$lib/components/account/SignupForm.svelte';
	import { ChevronLeft } from 'lucide-svelte';

	export let pageTitle = 'アカウント新規作成';
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col items-center justify-center pt-4">
		<!-- 戻るボタン -->
		<div class="mb-4 ml-8 self-start">
			<a
				href="/login"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<span class="text-sm">前に戻る</span>
			</a>
		</div>
		<!-- タイトル -->
		<div class="text-md mb-2 ml-8 self-start md:mb-4 md:text-xl">{pageTitle}</div>
		<!-- フォームパネル -->
		<div class="flex w-full flex-col px-8">
			<SignupForm cancelLink="/" />
		</div>
	</div>
</div>
