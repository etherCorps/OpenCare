import { z, ZodError, ZodObject } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const userCreationSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, 'Name should be greater than 3 words'),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must a be a valid email' }),
	phone: z
		.string({ required_error: 'Contact number is required' })
		.min(10, 'Provide a valid contact number'),
	password: z
		.string({ required_error: 'Confirm Password is required' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message:
				'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
		}),
	userType: z.enum(['SuperAdmin', 'Manager', 'Developer', 'Client']).optional()
});

export const loginSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please provide a valid mail' }),
	password: z
		.string({ required_error: 'Password is required' })
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
			message: 'Provide a valid password'
		})
});

export const projectSchema = z.object({
	projectName: z
		.string({ required_error: 'Name is required' })
		.min(3, 'Name should be greater than 3 words'),
	projectDescription: z
		.string({ required_error: 'Description is required' })
		.min(3, 'Name should be greater than 3 words'),
	projectId: z.string().optional()
});
export const formValidation = async (formData: FormData, schema: any) => {
	const formBody = Object.fromEntries(formData);
	try {
		const data = await schema.parse(formBody);
		return {
			formData: data,
			errors: null
		};
	} catch (err: any) {
		const errors = err.flatten();
		return {
			formData: formBody,
			errors: errors
		};
	}
};
