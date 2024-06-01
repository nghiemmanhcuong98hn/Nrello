import Board from '~/server/models/Board';
import List from '~/server/models/List';
import { Validator } from '#nuxt-server-utils';
import listSchema from '~/server/schemas/list.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);

	if (!body.board || !body.name) {
		throw createError({
			status: 400,
			statusMessage: 'Error validator',
			message: 'Missing or invalid! Please check your data request!'
		});
	}

	Validator.validateSchema(listSchema, body);

	const list = await List.create({
		...body,
		owner: user?._id
	});

	if (!list) {
		throw createError({
			status: 400,
			message: 'Something went wrong!'
		});
	}

	await Board.findOneAndUpdate(
		{
			$and: [
				{ _id: body.board },
				{
					$or: [{ owner: user?._id }, { managers: { $in: [user?._id] } }]
				}
			]
		},
		{
			$push: { list: list?._id }
		},
		{
			new: true
		}
	);

	return list;
});
