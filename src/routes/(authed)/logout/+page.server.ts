import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { deleteSession } from '$lib/server/redisSessionManager';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	if (locals && locals.userAuth && locals.userAuth.isAuthenticated) {
		const session = cookies.get('session') as string;
		if (Boolean(session)) {
			const decryptedSessionId = await JSON.parse(session);
			await deleteSession(decryptedSessionId);
			await cookies.delete('session', {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: !dev
			});
		}
		throw redirect(302, '/login');
	}
	throw redirect(302, '/login');
};
