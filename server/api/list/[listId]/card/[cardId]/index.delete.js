import Card from '~/server/models/Card';
import List from '~/server/models/List';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const listId = getRouterParam(event, 'listId');
	const cardId = getRouterParam(event, 'cardId');

	const card = await Card.findOneAndDelete({
		_id: cardId,
		owner: user._id,
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
			owner: user._id
		},
		{
			$pull: { cards: card?._id }
		}
	);

	event.node.res.statusCode = 204;
	return true;
});
