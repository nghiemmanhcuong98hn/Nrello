import Board from '~/server/models/Board';
import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const boardId = getRouterParam(event, 'id');

	const board = await Board.findOneAndDelete({ _id: boardId });

	if (!board) {
		throw createError({
			status: 404,
			message: 'Board not found'
		});
	}

	const list = await List.find({
		board: board?._id,
		owner: user._id
	});

	if (!list || list.length === 0) {
		event.node.res.statusCode = 204;
		return true;
	}

	await Promise.all(
		list.map(item => {
			return List.deleteOne({
				_id: item._id
			});
		})
	);

	await Promise.all(
		list.map(item => {
			return Card.deleteMany({
				list: item._id
			});
		})
	);

	event.node.res.statusCode = 204;
	return true;
});
