import Board from '~/server/models/Board';

export default defineEventHandler(async event => {
	const user = event.context.user;

	const boards = Board.find({ owner: user?._id }).sort({ order: 1 });

	return boards;
});
