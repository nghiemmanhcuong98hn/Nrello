import { Validator } from '#nuxt-server-utils';
import Board from '~/server/models/Board';
import boardSchema from '~/server/schemas/board.schema';

export default defineEventHandler(async event => {
	const user = event.context.user;

	const body = await readBody(event);

	Validator.validateSchema(boardSchema, body);

	const maxOrderBoard = await Board.findOne().sort({ order: -1 });

	const board = await Board.create({
		...body,
		order: maxOrderBoard.order ? maxOrderBoard.order + 1 : 1,
		owner: user?._id
	});

	return board;
});
