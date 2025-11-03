<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
</script>

<ScrollArea class="max-h-[70vh]">
	<Card.Root class="mx-auto w-full max-w-2xl border-0 shadow-none">
		<Card.Header>
			<Card.Title class="text-lg font-semibold text-gray-800">利用規約</Card.Title>
			<Card.Description>本サイトをご利用いただく前に必ずお読みください。</Card.Description>
		</Card.Header>

		<Card.Content>
			<div class="space-y-6 text-sm leading-relaxed text-gray-700">
				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第1条　本規約の範囲</h2>
					<p>
						オイスターカンパニー株式会社（以下「当社」といいます）は、当社が運営する「新鮮な牡蠣販売所」（以下「本サイト」といいます）の提供にあたり、
						本規約を定めます。利用者は、本サイトを利用することにより本規約に同意したものとみなします。
						なお、当社は必要に応じて本規約を改定できるものとし、改定後の規約は本サイト上に掲載した時点で効力を生じます。
					</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第2条　本サイトサービスの利用</h2>
					<p>
						利用者は、本規約および当社が定める各種方針に従って本サイトを利用するものとします。
						未成年者が本サイトを利用する場合は、法定代理人の同意を得たうえで利用してください。
						当社は日本国内においてのみサービスを提供するものとします。
					</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第3条　会員登録</h2>
					<p>
						利用者は、当社が定める方法に従い会員登録を行うことができます。
						当社は、申請内容に虚偽がある場合、過去に規約違反がある場合、その他不適当と判断した場合には登録を承認しないことがあります。
						また、登録は日本国内に住所を有する方に限られます。
					</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第4条　禁止事項</h2>
					<p>利用者は、本サイトの利用に際して以下の行為を行ってはなりません。</p>
					<ul class="mt-1 list-inside list-disc space-y-1">
						<li>法令または公序良俗に反する行為</li>
						<li>他の利用者、第三者、または当社の権利を侵害する行為</li>
						<li>虚偽の情報を登録または送信する行為</li>
						<li>当社の運営を妨げる行為</li>
					</ul>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第5条　免責事項</h2>
					<p>
						当社は、本サイトの内容や提供情報の正確性、有用性、確実性について保証するものではありません。
						また、利用者が本サイトを利用したことによって生じた損害について、当社は一切の責任を負いません。
					</p>
				</section>

				<section>
					<h2 class="mb-1 font-semibold text-gray-900">第6条　準拠法および裁判管轄</h2>
					<p>本規約は日本法に準拠し、当社所在地を管轄する裁判所を専属的合意管轄裁判所とします。</p>
				</section>

				<p class="mt-6 text-right text-xs text-gray-500">制定日：2026年1月1日</p>
			</div>
		</Card.Content>
	</Card.Root>
</ScrollArea>
