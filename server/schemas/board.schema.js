import { z } from 'zod';

export default z.object({
	name: z
		.string({
			required_error: 'Name is required!'
		})
		.min(1)
		.max(255),
	description: z.string().min(1).max(255).optional(),
	coverImage: z.string().min(1).max(255).optional().nullable(),
	list: z.array(z.string()).optional()
});
