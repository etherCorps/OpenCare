import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { string } from 'zod';

const userExtension = {
	findUserByEmail(email: string) {
		return findEmail(email);
	},

	signup(data: any) {
		return createNewUser(data);
	}
};
export const prisma = new PrismaClient().$extends({
	model: {
		$allModels: {
			async findById(id: string | number, modelName: any) {
				// @ts-ignore
				return await prisma[modelName].findUnique({
					where: {
						id: id
					}
				});
			},

			async deleteById(id: string | number, modelName: any) {
				// @ts-ignore
				return await prisma[modelName].delete({
					where: {
						id: id
					}
				});
			}
		},
		user: userExtension
	}
});

async function findEmail(email: string) {
	return await prisma.user.findFirst({
		where: {
			email: email
		}
	});
}

async function createNewUser(data: any) {
	const hashedPassword = bcrypt.hashSync(data.password, 10);
	data['password'] = hashedPassword;

	return await prisma.user.create({ data });
}
