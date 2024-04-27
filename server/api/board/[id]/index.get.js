import Board from '~/server/models/Board';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const boardId = getRouterParam(event, 'id');

	const board = await Board.findOne({
		_id: boardId,
		owner: user?._id
	}).populate({ path: 'list', model: List });

	if (!board) {
		return createError({
			status: 404,
			statusMessage: 'Not found',
			message: 'Board is not found!'
		});
	}

	return board;
});
