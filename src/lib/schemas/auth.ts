import { z } from 'zod';

// ログイン用のスキーマ
export const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: '必須項目です' })
		.pipe(z.email({ message: '有効なメールアドレスを入力してください' })),

	password: z.string().min(8, { message: '半角英数字8文字以上にしてください' })
});

// 新規登録用のスキーマ
export const signupSchema = z
	.object({
		email: z
			.string()
			.min(1, { message: '必須項目です' })
			.pipe(z.email({ message: '有効なメールアドレスを入力してください' })),

		password: z.string().min(8, { message: '半角英数字8文字以上にしてください' }),

		passwordConfirm: z.string().min(1, { message: '必須項目です' }),

		lastName: z.string().min(1, { message: '必須項目です' }),
		firstName: z.string().min(1, { message: '必須項目です' }),

		lastNameKana: z.string().min(1, { message: '必須項目です' }),
		firstNameKana: z.string().min(1, { message: '必須項目です' }),

		postalCode: z.string().min(1, { message: '必須項目です' }),
		prefecture: z.string().min(1, { message: '必須項目です' }),
		address1: z.string().min(1, { message: '必須項目です' }),
		address2: z.string().optional(), // 住所２は必須ではないのでoptionalに
		phoneNumber: z.string().min(1, { message: '必須項目です' })
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'パスワードが一致しません',
		path: ['passwordConfirm']
	});
