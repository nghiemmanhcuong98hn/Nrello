import { z } from 'zod';

export default z.object({
	name: z
		.string({
			required_error: 'Name is required'
		})
		.min(1)
		.max(255),
	cards: z.array(z.string()).optional(),
	board: z.string({
		required_error: 'Board is required'
	})
});
