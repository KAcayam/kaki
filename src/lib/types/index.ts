/* 以下の型定義はUI開発用のサンプルデータ(data.json)に基づいています
DBスキーマやAPI仕様に合わせて修正あるいは置き換えてください */

// 商品タイプ
export type ProductType = 'withShell' | 'noShell' | 'noImage' | 'loginRequired' | 'generic';

// 商品情報
export interface Product {
	id: string;
	name: string;
	price: number;
	image: string | null;
	type: ProductType;
	inStock: boolean;
	description: string;
	detailImages: string[];
	isLoggedInRequired?: boolean;
	defaultVariant?: string;
	quantity?: number;
}

// カート情報
export interface CartItem {
	id: string;
	title: string;
	variant: string;
	price: number;
	quantity: number;
	img: string | null;
	type: ProductType;
}

// 注文情報
export interface OrderSummary {
	cartItems: CartItem[];
	subtotal: number;
	shippingCost: number;
	total: number;
}

// 注文履歴
export interface Order {
	id: string;
	orderDate: string;
	orderNumber: string;
	totalAmount: number;
	status: OrderStatus;
	products: Product[];
	subtotal: number;
	shippingCost: number;
}

// 注文ステータス
export type OrderStatus =
	| '注文済み'
	| '入金待ち'
	| '発送準備中'
	| '配送中'
	| '配達完了'
	| 'キャンセル済み';

// アカウント情報(配送先情報なども含む)
export interface User {
	id: string;
	isPrimary?: boolean;
	lastName: string;
	firstName: string;
	lastNameKana: string;
	firstNameKana: string;
	email?: string;
	postalCode: string;
	prefecture: string;
	address1: string;
	address2: string;
	phoneNumber: string;
	receiveCampaignEmails: boolean;
}
