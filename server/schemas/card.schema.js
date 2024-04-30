import { z } from 'zod';

export default z.object({
	title: z
		.string({
			required_error: 'Title is required'
		})
		.max(255),
	description: z.string().optional().nullable(),
	isDone: z.boolean().optional(),
	startDate: z.string({
		required_error: 'Start date is required'
	}),
	endDate: z.string({
		required_error: 'End date is required'
	}),
	list: z.string().optional()
});
