import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/PrismaClient';

export const POST = (async ({ request, params, locals }) => {
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
			message: 'You are not allowed to add new member.'
		});
	}
	const data = await request.json();

	try {
		const newMember = await prisma.userProjects.create({
			data,
			select: {
				user: {
					select: {
						name: true
					}
				},
				project: {
					select: {
						name: true
					}
				},
				userType: true
			}
		});
		return json({ success: true, info: newMember });
	} catch (e) {
		console.log('Error While adding new member', e);
		return json({
			success: false,
			message: 'Error While adding new member, contact admin'
		});
	}
}) satisfies RequestHandler;

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

	try {
		const updateUserPermission = await prisma.userProjects.update({
			where: {
				id: id
			},
			data: {
				userType: userType
			},
			select: {
				user: {
					select: {
						name: true
					}
				},
				project: {
					select: {
						name: true
					}
				},
				userType: true
			}
		});
		return json({ success: true, info: updateUserPermission });
	} catch (e) {
		console.log('Error while updating member', e);
		return json({
			success: false,
			message: 'Error while updating member role, contact admin'
		});
	}
}) satisfies RequestHandler;

export const DELETE = (async ({ request, params, locals }) => {
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
			message: 'You are not allowed to delete a member.'
		});
	}
	const data = await request.json();

	try {
		const newMember = await prisma.userProjects.delete({
			where: {
				id: data.id
			},
			select: {
				user: {
					select: {
						name: true
					}
				},
				project: {
					select: {
						name: true
					}
				},
				userType: true
			}
		});
		return json({ success: true, info: newMember });
	} catch (e) {
		console.log('Error while deleting member', e);
		return json({
			success: false,
			message: 'Error while deleting member, contact admin'
		});
	}
}) satisfies RequestHandler;
