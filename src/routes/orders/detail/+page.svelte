<script lang="ts">
	import { ChevronLeft, CircleX } from 'lucide-svelte';
	import data from '$lib/data.json';
	import type { OrderStatus, Order, ProductType, OrderSummary } from '$lib/types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import OrderStatusPanel from './OrderStatus.svelte';
	import OrderItems from './OrderItems.svelte';
	import OrderPayment from './OrderPayment.svelte';
	import ConfirmCancelModal from './ConfirmOrderCancelModal.svelte';

	export const pageTitle = '注文履歴詳細';

	// クエリパラメータからorderIdを取得
	const orderId = $derived(page.url.searchParams.get('orderId'));

	// data.json から商品情報を取得し、productId をキーにしたマップを作成
	const productMap = new Map(data.products.map((p) => [p.id, p]));

	// data.json から注文履歴を取得し、OrderPanel が期待する形式に変換
	const orders: Order[] = (data.orders || []).map((order) => {
		const typedstatus: OrderStatus = order.status as OrderStatus;
		return {
			id: order.id,
			orderDate: order.date,
			orderNumber: order.id,
			totalAmount: order.total,
			status: typedstatus,
			subtotal: order.subtotal ?? 0,
			shippingCost: order.shippingCost ?? 0,
			products: order.items.map((item) => {
				const product = productMap.get(item.productId);
				return {
					id: item.productId,
					name: product?.name ?? '商品が見つかりません',
					price: item.price,
					image: product?.image ?? null,
					type: (product?.type ?? 'generic') as ProductType,
					inStock: product?.inStock ?? true,
					description: product?.description ?? '',
					detailImages: product?.detailImages ?? [],
					quantity: item.quantity
				};
			})
		};
	});

	// 現在表示する注文詳細
	const currentOrder: Order | undefined = $derived(orders.find((o) => o.id === orderId));

	// OrderPaymentPanelに渡すデータ
	const orderSummary: OrderSummary | undefined = $derived(
		currentOrder
			? {
					cartItems: [], // 詳細ページでは使用しないが型定義上必要なので空配列
					subtotal: currentOrder.subtotal,
					shippingCost: currentOrder.shippingCost,
					total: currentOrder.totalAmount
				}
			: undefined
	);

	// 注文キャンセルボタンを表示するかどうかの判定
	const showOrderCancelButton = $derived(
		currentOrder?.status === '注文済み' ||
			currentOrder?.status === '入金待ち' ||
			currentOrder?.status === '発送準備中'
	);

	// 注文キャンセル確認モーダル
	let showOrderCancelModal = $state(false);

	function handleOrderCancelClick() {
		showOrderCancelModal = true;
	}

	// 注文キャンセルを実行した際のロジック(現在は一覧に戻るのみ)
	function handleConfirmOrderCancel() {
		showOrderCancelModal = false;
		goto('/orders');
	}

	function handleCancelOrderCancel() {
		showOrderCancelModal = false;
	}
</script>

<div class="flex w-full items-center justify-center">
	<div class="mx-4 flex w-full max-w-screen-2xl flex-col justify-center pt-4 md:mx-8">
		<div class="mb-2 self-start md:mb-4">
			<a
				href="/orders"
				class="flex cursor-pointer items-center gap-2 text-gray-500 transition-colors hover:text-gray-700"
			>
				<ChevronLeft class="h-4 w-4 text-gray-600" />
				<div class="text-xs md:text-sm">一覧に戻る</div>
			</a>
		</div>
		<div class="mb-2 flex flex-row items-center md:mb-4">
			<div class="text-base md:text-xl">{pageTitle}</div>
		</div>

		{#if currentOrder}
			<div class="flex w-full justify-center">
				<div class="flex w-full flex-col justify-center md:max-w-2xl">
					<div class="mb-2 flex justify-end">
						{#if showOrderCancelButton}
							<Button
								class="cursor-pointer text-xs md:text-sm"
								onclick={handleOrderCancelClick}
								size="sm"
								variant="outline"
							>
								<CircleX class="text-red-600" />注文キャンセル</Button
							>
						{/if}
					</div>
					<!-- ステータスパネルは最上部 -->
					<OrderStatusPanel order={currentOrder} />

					<!-- md以上で以下を２カラム -->
					<div class="grid grid-cols-1 md:grid-cols-2 md:gap-2">
						<div class="flex flex-col">
							<OrderItems order={currentOrder} />
						</div>

						{#if orderSummary}
							<div class="flex flex-col">
								<OrderPayment {...orderSummary} />
							</div>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<p class="text-gray-500">注文が見つかりませんでした。</p>
		{/if}
	</div>
</div>

<!-- 削除確認モーダル -->
<ConfirmCancelModal
	bind:open={showOrderCancelModal}
	targetName={currentOrder?.id}
	onConfirm={handleConfirmOrderCancel}
	onCancel={handleCancelOrderCancel}
/>
