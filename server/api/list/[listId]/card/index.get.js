import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const listId = getRouterParam(event, 'listId');

	const list = await List.findOne({ _id: listId}).populate({
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
