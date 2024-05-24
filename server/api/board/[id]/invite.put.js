import Board from '~/server/models/Board';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);
	const id = getRouterParam(event, 'id');

	const board = await Board.findById(id);

	if (board?.owner.toString() !== user?._id.toString()) {
		return createError({
			status: 403,
			statusMessage: 'Unauthenticated!',
			message: 'You do not have access to this data!'
		});
	}

	if (board.managers.includes(body.userId)) {
		return createError({
			status: 400,
			statusMessage: 'Invalid user',
			message: 'User already exists in this board'
		});
	}

	await board.updateOne({
		$push: { managers: body.userId }
	});

	return {
		status: 200,
		statusMessage: 'Success!',
		message: 'Invite user successfully'
	};
});
