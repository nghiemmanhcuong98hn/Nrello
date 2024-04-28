import Board from '~/server/models/Board';
import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const listId = getRouterParam(event, 'listId');

	const list = await List.findOneAndDelete({
		_id: listId,
		owner: user._id
	});

	if (!list) {
		throw createError({
			status: 404,
			message: 'List not found'
		});
	}

	await Board.findOneAndUpdate(
		{
			_id: list?.board,
			owner: user._id
		},
		{
			$pull: { list: list?._id }
		}
	);

	await Card.deleteMany({
		list: list?._id,
		owner: user._id
	});

	event.node.res.statusCode = 204;
	return true;
});
