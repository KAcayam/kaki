<script lang="ts">
	const user = {
		LastName: '田中',
		FirstName: '太郎',
		LastNameKana: 'タナカ',
		FirstNameKana: 'タロウ',
		postal: '1010034',
		prefecture: '東京都',
		address1: '中央区銀座1-1-1',
		address2: 'パーク銀座101',
		phone: '05022334455',
		email: 'kaki@oystar.kaki',
		receiveCampaign: true
	};
</script>

<div class="mx-auto flex w-72 flex-col gap-4">
	<div class="flex flex-row gap-8">
		<div class="flex-1">
			<!-- flex-1 を追加して幅を均等に分割 -->
			<div class="text-sm text-gray-500">姓</div>
			<div class="break-all">{user.LastName}</div>
			<!-- break-all を追加 -->
		</div>
		<div class="flex-1">
			<!-- flex-1 を追加 -->
			<div class="text-sm text-gray-500">名</div>
			<div class="break-all">{user.FirstName}</div>
			<!-- break-all を追加 -->
		</div>
	</div>

	<div class="flex flex-row gap-8">
		<div class="flex-1">
			<!-- flex-1 を追加 -->
			<div class="text-sm text-gray-500">姓(カナ)</div>
			<div class="break-all">{user.LastNameKana}</div>
			<!-- break-all を追加 -->
		</div>
		<div class="flex-1">
			<!-- flex-1 を追加 -->
			<div class="text-sm text-gray-500">名(カナ)</div>
			<div class="break-all">{user.FirstNameKana}</div>
			<!-- break-all を追加 -->
		</div>
	</div>

	<div class="">
		<div class="text-sm text-gray-500">郵便番号</div>
		<div class="break-all">{user.postal}</div>
		<!-- break-all を追加 -->
	</div>

	<div class="">
		<div class="text-sm text-gray-500">都道府県</div>
		<div class="break-all">{user.prefecture}</div>
		<!-- break-all を追加 -->
	</div>

	<div class="">
		<div class="text-sm text-gray-500">住所１</div>
		<div class="break-all">{user.address1}</div>
		<!-- break-all を追加 -->
	</div>

	<div class="">
		<div class="text-sm text-gray-500">住所２</div>
		<div class="break-all">{user.address2}</div>
		<!-- break-all を追加 -->
	</div>

	<div class="">
		<div class="text-sm text-gray-500">電話番号</div>
		<div class="break-all">{user.phone}</div>
		<!-- break-all を追加 -->
	</div>

	<div class="">
		<div class="text-sm text-gray-500">メールアドレス</div>
		<div class="break-all">{user.email}</div>
		<!-- break-all を追加 -->
	</div>
</div>
