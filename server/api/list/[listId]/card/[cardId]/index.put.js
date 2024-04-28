import { Validator } from '#nuxt-server-utils';
import Card from '~/server/models/Card';
import cardSchema from '~/server/schemas/card.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);
	const listId = getRouterParam(event, 'listId');
	const cardId = getRouterParam(event, 'cardId');

	Validator.validateSchema(cardSchema.partial(), body);

	if (!listId) {
		throw createError({
			status: 404,
			message: 'List not found!'
		});
	}

	const card = await Card.findOneAndUpdate(
		{
			_id: cardId,
			list: listId,
			owner: user._id
		},
		{
			$set: body
		},
		{
			new: true
		}
	);

	if (!card) {
		throw createError({
			status: 400,
			message: 'Something when wrong!'
		});
	}

	return card;
});
