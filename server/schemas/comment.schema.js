import { z } from 'zod';

export default z.object({
	message: z
		.string({
			required_error: 'Message is required'
		})
		.max(255)
});
