import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const listId = getRouterParam(event, 'listId');
	const cardId = getRouterParam(event, 'cardId');

	const card = await Card.findOneAndDelete({
		_id: cardId,
		list: listId
	});

	if (!card) {
		throw createError({
			status: 404,
			message: 'Card not found'
		});
	}

	await List.findOneAndUpdate(
		{
			_id: listId,
		},
		{
			$pull: { cards: card?._id }
		}
	);

	event.node.res.statusCode = 204;
	return true;
});
