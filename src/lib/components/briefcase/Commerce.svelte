<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
</script>

<ScrollArea class="max-h-[70vh]">
	<Card.Root class="mx-auto w-full max-w-2xl border-0 shadow-none">
		<Card.Header>
			<Card.Title class="text-lg font-semibold text-gray-800">特定商取引法に基づく表記</Card.Title>
			<Card.Description>本サイトでの取引に関する重要事項を記載しております。</Card.Description>
		</Card.Header>

		<Card.Content>
			<div class="space-y-6 text-sm leading-relaxed text-gray-700">
				<section>
					<h2 class="mb-1 font-semibold text-gray-900">販売業者</h2>
					<p>株式会社オイスターカンパニー</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">代表者</h2>
					<p>牡蠣太郎</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">所在地</h2>
					<p>東京都東京2-2-2</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">電話番号</h2>
					<p>050-2233-4455</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">メールアドレス</h2>
					<p>kaki@oystar.kaki</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">お支払い方法と時期</h2>
					<ul class="mt-1 list-inside list-disc space-y-1">
						<li>クレジットカード：前払い（ご注文時にカード情報をご登録ください）</li>
						<li>銀行振込：前払い（配送希望日の3日前までに振込確認）</li>
						<li>
							コンビニ決済：前払い（配送希望日の3日前まで／指定なしの場合は注文から3日後23:59まで）
						</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">商品代金以外の必要料金</h2>
					<ul class="mt-1 list-inside list-disc space-y-1">
						<li>消費税</li>
						<li>コンビニ決済手数料：220円（税込）</li>
						<li>配送料：全国一律 864円、北海道 1,100円、沖縄・離島 1,900円</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">返品・交換について</h2>
					<p>
						生鮮食品のため、不良品以外の返品・交換はお受けできません。
						万が一不良品があった場合は、商品到着から3日以内に電話またはメールでご連絡ください。
						ご連絡がない場合、返品には応じられません。 お客様のご都合による返品・交換はできません。
					</p>
				</section>
			</div>
		</Card.Content>
	</Card.Root>
</ScrollArea>
