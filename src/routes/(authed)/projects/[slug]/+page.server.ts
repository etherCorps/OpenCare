import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/PrismaClient';

export const load: PageServerLoad = async ({ params, depends }) => {
	return {
		currentProject: currentProject(params),
		projectMembers: projectMembers(params)
	};
};

const projectMembers = async (params: any) => {
	const projectMembers = await prisma.userProjects.findMany({
		where: {
			projectId: params.slug
		},
		select: {
			id: true,
			userType: true,
			user: {
				select: {
					id: true,
					name: true,
					email: true,
					profileIcon: true,
					active: true
				}
			}
		}
	});
	return projectMembers;
};

const currentProject = async (params: any) => {
	return await prisma.projects.findUnique({
		where: {
			id: params.slug
		}
	});
};
