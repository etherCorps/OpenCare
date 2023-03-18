import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/PrismaClient';
import { loginSchema, formValidation } from '$lib/utils/zodSchemas';
import bcrypt from 'bcrypt';
import { removeKeysFromDict } from '$lib/utils/helpers';
import { dev } from '$app/environment';
import { createOrUpdateSession } from '$lib/server/redisSessionManager';

export const actions: Actions = {
	default: async ({ request, cookies, url }) => {
		const { formData, errors } = await formValidation(await request.formData(), loginSchema);
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
				message: 'Check form for errors'
			});
		}

		const userData = await prisma.user.findUserByEmail(formData.email);
		if (!userData) {
			return fail(404, {
				data: formData,
				message: `User doesn't exist`
			});
		}

		if (!userData.active) {
			return fail(400, {
				data: formData,
				message: `This account is inactive or unverified`
			});
		}

		const validPassword = bcrypt.compareSync(formData.password, userData.password);

		if (!validPassword)
			return fail(400, {
				data: formData,
				errors: { password: ['Provide correct password'] },
				message: `Password is not valid.`
			});

		const userDataForClient = await removeKeysFromDict(userData, [
			'createdAt',
			'updatedAt',
			'password'
		]);

		const expiryDateUnixSeconds = Math.round(Date.now() / 1000 + 60 * 60 * 24 * 30);
		const newSession = await createOrUpdateSession(expiryDateUnixSeconds, userDataForClient);

		cookies.set('session', newSession, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev,
			maxAge: 60 * 60 * 24 * 30
		});

		let defaultRedirect = '/dashboard';
		if (url.search.startsWith('?next')) {
			defaultRedirect = url.searchParams.get('next') as string;
		}

		throw redirect(307, defaultRedirect);
	}
};
