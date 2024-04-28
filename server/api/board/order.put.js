import Board from '~/server/models/Board';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const body = await readBody(event);

	if (!body.newIndex || !body.oldIndex) {
		throw createError({
			status: 'Validation Error',
			message: 'Missing newIndex or oldIndex board'
		});
	}

	const [startBoard, endBoard] = await Promise.all([
		Board.findOne({
			order: body.oldIndex,
			owner: user?._id
		}),
		Board.findOne({
			order: body.newIndex,
			owner: user?._id
		})
	]);

	await Promise.all([
		startBoard.updateOne({
			order: body.newIndex
		}),
		endBoard.updateOne({
			order: body.oldIndex
		})
	]);

	event.node.res.statusCode = 200;
	return true;
});
