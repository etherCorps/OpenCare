import type { Actions, ServerLoad } from '@sveltejs/kit';
import { formValidation, projectSchema } from '$lib/utils/zodSchemas';
import { fail, json, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/PrismaClient';
import type { PageServerLoad } from './$types';

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

export const load: PageServerLoad = async ({ locals }) => {
	return {
		projects: getUserProjects(locals.userAuth.user)
	};
};
export const actions: Actions = {
	createProject: async ({ request, locals }) => {
		const requestFormData = await request.formData();
		const { formData, errors } = await formValidation(requestFormData, projectSchema);
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
				message: 'Check form for errors'
			});
		}
		const allAdmins = await prisma.user.findMany({
			select: {
				id: true
			},
			where: {
				userType: 'Admin',
				active: true
			}
		});
		const data: { userId: string; userType: 'Admin' }[] = allAdmins.map(({ id }) => ({
			userId: id,
			userType: 'Admin'
		}));

		const newProject = await prisma.projects.create({
			data: {
				name: formData.projectName as string,
				description: formData.projectDescription as string,
				logo: '',
				users: {
					create: data
				}
			}
		});
		return { success: true, name: newProject.name, projectId: newProject.id };
	},
	updateProject: async ({ request, params, locals }) => {
		const requestFormData = await request.formData();
		const { formData, errors } = await formValidation(requestFormData, projectSchema);
		const userValidation = await prisma.userProjects.findFirst({
			where: {
				userId: locals.userAuth.user?.id,
				projectId: formData.projectId
			},
			select: {
				userType: true
			}
		});
		if (!userValidation || userValidation.userType !== 'Admin') {
			return fail(400, {
				success: false,
				message: 'You are not allowed to delete a member.'
			});
		}
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
				message: 'Check form for errors'
			});
		}
		try {
			const updatedProject = await prisma.projects.update({
				where: {
					id: formData?.projectId
				},
				data: {
					name: formData.projectName,
					description: formData.projectDescription
				}
			});
			return { success: true, data: formData };
		} catch (e) {
			console.log('Error while updating project', e);
			return { success: false, data: formData, message: 'Project Update Error' };
		}
	}
};
