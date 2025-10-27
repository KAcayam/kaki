import { writable } from 'svelte/store';

// ログイン状態を管理するストア
// 実際は()のところ、仮で(true)とする
export const isLoggedIn = writable(false);

// ユーザー名を管理するストア
// 実際は()のところ、仮で('田中太郎')とする
export const userName = writable<string | null>('田中太郎');

// ログイン関数
export function login(name: string) {
	isLoggedIn.set(true);
	userName.set(name);
	// ここでAPI呼び出しやトークン保存などのログイン処理を行う
}

// ログアウト関数
export function logout() {
	isLoggedIn.set(false);
	userName.set(null);
	// ここでトークン削除などのログアウト処理を行う
}
