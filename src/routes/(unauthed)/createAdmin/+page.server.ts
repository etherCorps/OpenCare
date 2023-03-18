import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { prisma } from '$lib/server/PrismaClient';
import { formValidation, userCreationSchema } from '$lib/utils/zodSchemas';

export const actions: Actions = {
	default: async ({ request }) => {
		const permissionData = await prisma.additionalPermissions.findFirst();
		if (permissionData && !permissionData.saCreation) {
			return fail(412, {
				message: 'You are not allowed to create user from here.'
			});
		}
		const { formData, errors } = await formValidation(await request.formData(), userCreationSchema);
		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors,
				message: 'Check form for errors'
			});
		}
		const checkUser = await prisma.user.findUserByEmail(formData.email);
		if (checkUser) {
			return fail(409, {
				data: formData,
				message: 'User already exist.'
			});
		}
		const userIcon = `https://api.dicebear.com/5.x/bottts/png?seed=${formData.name.toString()}`;

		try {
			formData['userType'] = 'Admin';
			formData['active'] = true;
			formData['profileIcon'] = userIcon;
			const newUser = await prisma.user.signup(formData);
		} catch (e) {
			console.log('User Creation Error', e);
			return fail(500, {
				data: formData,
				message: 'Unable to create user please try again'
			});
		}
		if (permissionData === null)
			await prisma.additionalPermissions.create({ data: { saCreation: false } });
		throw redirect(307, '/login');
	}
};
