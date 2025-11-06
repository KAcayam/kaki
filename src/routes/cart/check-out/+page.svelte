<script lang="ts">
	import Stepper from '$lib/components/ui/Stepper.svelte';
	import { Button } from '$lib/components/ui/button';
	import data from '$lib/data.json';
	import { goto } from '$app/navigation';
	import { isLoggedIn } from '$lib/stores/auth';

	export const pageTitle = 'ご購入いただきありがとうございます';
	let currentStepperIndex = $state(4);

	const { backToTopLink = '/', guestSignupLink = '/signup/guest' } = $props<{
		backToTopLink?: string;
		guestSignupLink?: string;
	}>();

	function backToTop() {
		goto(backToTopLink);
	}

	function goToGuestSignup() {
		goto(guestSignupLink);
	}

	// JSONからユーザー情報取得
	const user = data.user.find((u) => u.id === '2');
</script>

<div class="flex w-full items-center justify-center">
	<div class="flex w-full max-w-screen-2xl flex-col justify-center pt-6">
		<div class="mx-auto mb-8 w-full max-w-4xl px-8 pt-5">
			<Stepper currentStepIndex={currentStepperIndex} />
		</div>

		<div class="my-6 flex flex-row items-center justify-center">
			<div class="text-md md:text-xl">{pageTitle}</div>
		</div>

		<div class="mx-auto flex w-full max-w-lg flex-col gap-2 px-8">
			{#if $isLoggedIn}
				<!-- ログイン済みの場合 -->
				<div class="mx-auto text-sm text-gray-600">
					登録されたメールアドレス宛に確認メールが送信されました
				</div>
			{:else}
				<!-- ゲスト購入の場合 -->
				<div class="mx-auto text-sm text-gray-600">
					ゲスト購入情報のメールアドレス宛に確認メールが送信されました
				</div>

				<div class="mx-auto flex w-full flex-col gap-4 pt-8">
					<div class="mx-auto text-sm text-gray-600">
						購入者情報を登録すると次回以降の取引がスムーズになります
					</div>

					<Button
						class="mx-auto w-72 cursor-pointer bg-blue-500 hover:bg-blue-600"
						onclick={goToGuestSignup}
					>
						登録する
					</Button>
				</div>
			{/if}

			<div class="mx-auto flex pt-8">
				<Button
					onclick={backToTop}
					class="w-72 cursor-pointer text-gray-600 hover:text-gray-700"
					variant="outline"
				>
					TOPに戻る
				</Button>
			</div>
		</div>
	</div>
</div>
