import { Validator } from '#nuxt-server-utils';
import List from '~/server/models/List';
import listSchema from '~/server/schemas/list.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);
	const listId = getRouterParam(event, 'listId');

	Validator.validateSchema(listSchema.partial(), body);

	const list = List.findOneAndUpdate(
		{
			_id: listId,
			owner: user?._id
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

	return list;
});
