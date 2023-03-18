import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/PrismaClient';

export const DELETE = (async ({ request, params, locals }) => {
	const data = await request.json();
	const userValidation = await prisma.userProjects.findFirst({
		where: {
			userId: locals.userAuth.user?.id,
			projectId: data.id
		},
		select: {
			userType: true
		}
	});
	if (userValidation?.userType !== 'Admin') {
		return json({
			success: false,
			message: 'You are not allowed to delete a member.'
		});
	}

	try {
		const deleteProject = await prisma.projects.delete({
			where: {
				id: data.id
			}
		});
		return json({ success: true, info: deleteProject });
	} catch (e) {
		console.log('Error while deleting project', e);
		return json({
			success: false,
			message: 'Error while deleting project, contact admin'
		});
	}
}) satisfies RequestHandler;
