import { Validator } from '#nuxt-server-utils';
import Comment from '~/server/models/Comment';
import commentSchema from '~/server/schemas/comment.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);
	const cardId = getRouterParam(event, 'cardId');

	Validator.validateSchema(commentSchema, body);

	const comment = await Comment.create({
		...body,
		owner: user._id,
		card: cardId
	});

	if (!comment) {
		throw createError({
			status: 400,
			statusMessage: 'Error',
			message: 'Something went wrong'
		});
	}

	return comment;
});
