import { Validator } from '#nuxt-server-utils';
import Card from '~/server/models/Card';
import List from '~/server/models/List';
import cardSchema from '~/server/schemas/card.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);
	const listId = getRouterParam(event, 'listId');

	Validator.validateSchema(cardSchema, body);

	if (!listId) {
		throw createError({
			status: 404,
			message: 'List not found!'
		});
	}

	const card = await Card.create({
		...body,
		list: listId,
		startDate: new Date(body.startDate),
		endDate: new Date(body.endDate),
		owner: user._id
	});

	await List.findOneAndUpdate(
		{
			_id: listId,
			owner: user._id
		},
		{
			$push: { cards: card?._id }
		},
		{
			new: true
		}
	);

	return card;
});
