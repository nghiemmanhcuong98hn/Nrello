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
			order: body.oldIndex
		}),
		Board.findOne({
			order: body.newIndex
		})
	]);

	await Promise.all([
		startBoard.updateOne({
			order: 999999
		}),
		endBoard.updateOne({
			order: 999998
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
