import { z } from 'zod';

export default z.object({
	title: z
		.string({
			required_error: 'Title is required'
		})
		.max(255),
	description: z.string({
		required_error: 'Description is required'
	}),
	list: z.string().optional()
});
