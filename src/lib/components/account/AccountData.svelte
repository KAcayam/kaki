<script lang="ts">
	// 親コンポーネントからユーザー情報を受け取る
	let { user }: { user: any } = $props();
</script>

<div class="flex w-96 flex-col">
	<div class="flex flex-col gap-4 rounded-lg border border-gray-200 p-8">
		<div class="flex flex-row gap-8">
			<div class="flex-1">
				<div class="text-sm text-gray-500">姓</div>
				<div class="break-all">{user.lastName}</div>
			</div>
			<div class="flex-1">
				<div class="text-sm text-gray-500">名</div>
				<div class="break-all">{user.firstName}</div>
			</div>
		</div>

		<div class="flex flex-row gap-8">
			<div class="flex-1">
				<div class="text-sm text-gray-500">姓(カナ)</div>
				<div class="break-all">{user.lastNameKana}</div>
			</div>
			<div class="flex-1">
				<div class="text-sm text-gray-500">名(カナ)</div>
				<div class="break-all">{user.firstNameKana}</div>
			</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">メールアドレス</div>
			<div class="break-all">{user.email}</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">郵便番号</div>
			<div class="break-all">{user.postalCode}</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">都道府県</div>
			<div class="break-all">{user.prefecture}</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">住所１</div>
			<div class="break-all">{user.address1}</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">住所２</div>
			<div class="break-all">{user.address2}</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">電話番号</div>
			<div class="break-all">{user.phone}</div>
		</div>

		<div class="">
			<div class="text-sm text-gray-500">キャンペーンメール</div>
			<div>{user.receiveCampaignEmails ? '受信する' : '受信しない'}</div>
		</div>
	</div>
</div>
