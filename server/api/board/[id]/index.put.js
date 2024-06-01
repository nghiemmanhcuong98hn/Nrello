import { Validator } from '#nuxt-server-utils';
import Board from '~/server/models/Board';
import boardSchema from '~/server/schemas/board.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);
	const id = getRouterParam(event, 'id');

	Validator.validateSchema(boardSchema.partial(), body);

	const board = await Board.findById(id);

	if (
		board?.owner.toString() !== user?._id.toString() &&
		!board.managers?.map(id => id?.toString()).includes(user?._id?.toString())
	) {
		return createError({
			status: 403,
			statusMessage: 'Unauthenticated!',
			message: 'You do not have access to this data!'
		});
	}

	await board.updateOne(body);

	return {
		status: 200,
		statusMessage: 'Success!',
		message: 'Updated board successfully'
	};
});
