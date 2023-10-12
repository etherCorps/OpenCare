import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { getSession } from '$lib/server/redisSessionManager';
import { dev } from '$app/environment';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session') as string;
	event.locals.userAuth = {
		isAuthenticated: false,
		user: null
	};
	if (!session) {
		if (event.route.id?.startsWith('/(authed)')) {
			if (event.url.pathname !== '/logout') {
				throw redirect(303, `/login?next=${event.url.pathname}`);
			}
		}
		return resolve(event);
	}

	try {
		const { encrypted, iv } = await JSON.parse(session);
		if (encrypted && iv) {
			const { redisData, expiryTime } = await getSession({ encrypted, iv });
			if (!Boolean(redisData)) {
				event.cookies.delete('session', { path: '/' });
			}

			if (redisData) {
				event.locals.userAuth = {
					isAuthenticated: true,
					user: JSON.parse(redisData)
				};
			}
		}
	} catch (e) {
		console.error(e);
	}
	if (event.route.id?.startsWith('/(authed)')) {
		if (!event.locals.userAuth.user) {
			event.cookies.delete('session', {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: !dev
			});
			throw redirect(303, `/login?next=${event.url.pathname}`);
		}
	}

	if (event.route.id?.startsWith('/(unauthed)')) {
		if (event.locals.userAuth.user) {
			throw redirect(303, `dashboard`);
		}
	}
	return resolve(event);
};
