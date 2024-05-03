import Comment from '~/server/models/Comment';
import { Validator } from '#nuxt-server-utils';
import commentSchema from '~/server/schemas/comment.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const cardId = getRouterParam(event, 'cardId');
	const commentId = getRouterParam(event, 'commentId');
	const body = await readBody(event);

      Validator.validateSchema(commentSchema, body);

	const comment = await Comment.findOneAndUpdate(
		{
			_id: commentId,
			card: cardId,
			owner: user._id
		},
		{
			$set: body
		},
		{
			new: true
		}
	);

	if (!comment) {
		throw createError({
			status: 404,
			message: 'Comment not found'
		});
	}

	return comment;
});
