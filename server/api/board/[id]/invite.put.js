import Board from '~/server/models/Board';
import transporter from '~/server/services/nodemailer';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const boardId = getRouterParam(event, 'id');
	const body = await readBody(event);

	try {
		const info = await transporter.sendMail({
			from: 'nghiemmanhcuong98.hn@gmail.com',
			to: 'nghiemmanhcuong198@gmail.com',
			subject: 'Test Email',
			text: 'This is a test email.'
		});
		console.log('Email sent:', info);
	} catch (error) {
		console.error('Error sending email:', error);
	}

	// if (!body.userId) {
	// 	throw createError({
	// 		status: 403,
	// 		message: 'Missing userid in request'
	// 	});
	// }

	// const board = await Board.findOneAndUpdate(
	// 	{
	// 		_id: boardId,
	// 		owner: user._id
	// 	},
	// 	{
	// 		$push: { managerUsers: body.userId }
	// 	},
	// 	{
	// 		new: true
	// 	}
	// );

	// if (!board) {
	// 	throw createError({
	// 		status: 400,
	// 		message: 'Something went wrong'
	// 	});
	// }

	// return true;
});
