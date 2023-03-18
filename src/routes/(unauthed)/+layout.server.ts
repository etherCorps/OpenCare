import { prisma } from '$lib/server/PrismaClient';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const permissionData = await prisma.additionalPermissions.findFirst();
	return {
		permission: permissionData === null ? true : permissionData.saCreation,
		isAuthenticated: locals?.userAuth?.isAuthenticated
	};
};
