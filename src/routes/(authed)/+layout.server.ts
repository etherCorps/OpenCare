import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/PrismaClient';

const getUserProjects = async (user: any) => {
	const projects = await prisma.userProjects.findMany({
		where: {
			userId: user.id
		},
		select: {
			userId: true,
			userType: true,
			project: true,
			projectId: true
		}
	});
	return projects;
};

const getAllUsers = async () => {
	const users = await prisma.user.findMany({
		where: {
			active: true
		},
		select: {
			id: true,
			name: true,
			email: true,
			profileIcon: true
		}
	});
	return users;
};
export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.userAuth.isAuthenticated) {
		throw redirect(303, '/login');
	}
	return {
		user: locals.userAuth.user,
		projects: getUserProjects(locals.userAuth.user),
		allUsers: getAllUsers()
	};
};
