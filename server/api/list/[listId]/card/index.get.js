import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const listId = getRouterParam(event, 'listId');

	const list = await List.findOne({ _id: listId, owner: user._id }).populate({
		path: 'cards',
		model: Card
	});

	if (!list) {
		throw createError({
			status: 404,
			message: 'List not found'
		});
	}

	return list?.cards;
});
