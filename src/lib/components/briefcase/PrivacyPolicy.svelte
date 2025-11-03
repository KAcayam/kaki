<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
</script>

<ScrollArea class="max-h-[70vh]">
	<Card.Root class="mx-auto w-full max-w-2xl border-0 shadow-none">
		<Card.Header>
			<Card.Title class="text-lg font-semibold text-gray-800">個人情報保護方針</Card.Title>
			<Card.Description
				>当社はお客様の個人情報を適切に管理し、以下の方針に従って取り扱います。</Card.Description
			>
		</Card.Header>

		<Card.Content>
			<div class="space-y-6 text-sm leading-relaxed text-gray-700">
				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第1条　個人情報の収集</h2>
					<p>
						当社は、商品購入や会員登録、サービス利用時に必要な範囲で個人情報を収集いたします。
						収集する情報は、氏名、住所、電話番号、メールアドレスなど、サービス提供に必要な情報に限ります。
					</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第2条　利用目的</h2>
					<p>収集した個人情報は、以下の目的で利用いたします：</p>
					<ul class="mt-1 list-inside list-disc space-y-1">
						<li>商品の発送およびサービス提供</li>
						<li>お問い合わせへの対応</li>
						<li>当社サービスに関するご案内や重要なお知らせの送付</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第3条　第三者提供</h2>
					<p>法令に基づく場合を除き、収集した個人情報を第三者に提供することはありません。</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第4条　安全管理</h2>
					<p>当社は、個人情報の漏洩、滅失、毀損を防ぐために、適切な安全管理措置を講じます。</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第5条　開示・訂正・削除</h2>
					<p>
						お客様は、当社が保有する自己の個人情報について、開示、訂正、削除を請求する権利があります。
						請求方法は当社ウェブサイトにてご案内いたします。
					</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第6条　本方針の変更</h2>
					<p>
						本方針は、法令または当社の都合により変更される場合があります。
						変更後の方針は、本ウェブサイトに掲載された時点から効力を生じます。
					</p>
				</section>

				<p class="mt-6 text-right text-xs text-gray-500">制定日：2026年1月1日</p>
			</div>
		</Card.Content>
	</Card.Root>
</ScrollArea>
