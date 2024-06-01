import Board from '~/server/models/Board';
import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const listId = getRouterParam(event, 'listId');

	const list = await List.findOneAndDelete({
		_id: listId
	});

	if (!list) {
		throw createError({
			status: 404,
			message: 'List not found'
		});
	}

	await Board.findOneAndUpdate(
		{
			_id: list?.board
		},
		{
			$pull: { list: list?._id }
		}
	);

	await Card.deleteMany({
		list: list?._id
	});

	event.node.res.statusCode = 204;
	return true;
});
