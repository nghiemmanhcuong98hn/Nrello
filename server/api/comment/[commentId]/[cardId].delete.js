import Comment from '~/server/models/Comment';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const cardId = getRouterParam(event, 'cardId');
	const commentId = getRouterParam(event, 'commentId');

	const comment = await Comment.findOneAndDelete({
		_id: commentId,
		card: cardId,
		owner: user._id
	});

	if (!comment) {
		throw createError({
			status: 404,
			message: 'Comment not found'
		});
	}

	event.node.res.statusCode = 203;
	return true;
});
