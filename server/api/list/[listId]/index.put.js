import { Validator } from '#nuxt-server-utils';
import Board from '~/server/models/Board';
import Card from '~/server/models/Card';
import List from '~/server/models/List';
import listSchema from '~/server/schemas/list.schema';

export default defineEventHandler(async event => {
	const body = await readBody(event);
	const listId = getRouterParam(event, 'listId');

	Validator.validateSchema(listSchema.partial(), body);

	const list = List.findOneAndUpdate(
		{
			_id: listId
		},
		{
			$set: body
		},
		{ new: true }
	);

	if (!list) {
		throw createError({
			status: 400,
			statusMessage: 'Error',
			message: 'Something went wrong'
		});
	}

	if (body.cards && body.cards.length > 0) {
		await Promise.all(
			body.cards.map(cardId => {
				return Card.findOneAndUpdate(
					{
						_id: cardId
					},
					{ $set: { list: listId } }
				);
			})
		);
	}

	return list;
});
