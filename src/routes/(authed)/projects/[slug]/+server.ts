import { fail, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/PrismaClient';

export const PATCH = (async ({ request, params, locals }) => {
	const userValidation = await prisma.userProjects.findFirst({
		where: {
			userId: locals.userAuth.user?.id,
			projectId: params.slug
		},
		select: {
			userType: true
		}
	});
	if (userValidation?.userType !== 'Admin') {
		return json({
			success: false,
			message: 'You are not allowed to update the user permission'
		});
	}
	const { id, userType } = await request.json();

	const updateUserPermission = await prisma.userProjects.update({
		where: {
			id: id
		},
		data: {
			userType: userType
		}
	});
	return json({ id, userType });
}) satisfies RequestHandler;
