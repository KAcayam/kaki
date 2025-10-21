<script lang="ts">
	import SignupForm from '$lib/components/SignupForm.svelte';
	import { ChevronLeft } from 'lucide-svelte';
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col items-center justify-center pt-6">
		<!-- 戻るボタン -->
		<div class="mb-4 ml-8 self-start">
			<a href="/login">
				<button
					class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
				>
					<ChevronLeft class="h-4 w-4 text-gray-600" />
					<span class="text-sm">前に戻る</span>
				</button>
			</a>
		</div>
		<!-- タイトル -->
		<h1 class="mb-6 ml-8 self-start text-xl">アカウント作成</h1>
		<!-- フォームパネル -->
		<div class="flex w-full max-w-sm flex-col gap-6">
			<SignupForm />
		</div>
	</div>
</div>
