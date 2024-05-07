import { z } from 'zod';

export default z.object({
	title: z
		.string({
			required_error: 'Title is required'
		})
		.max(255),
	description: z.string().optional().nullable(),
	isDone: z.boolean().optional(),
	list: z.string().optional()
});
