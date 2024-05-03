import Comment from '~/server/models/Comment';
import { User } from '~/server/models/User';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const cardId = getRouterParam(event, 'cardId');

	const comments = await Comment.find({
		card: cardId,
		owner: user._id
	})
		.populate({
			path: 'owner',
			model: User
		})
		.sort({ createdAt: -1 });

	if (!comments) {
		throw createError({
			status: 404,
			message: 'Comment not found'
		});
	}

	return comments;
});
