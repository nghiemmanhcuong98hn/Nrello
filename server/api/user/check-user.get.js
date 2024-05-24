import { User } from '~/server/models/User';

export default defineEventHandler(async event => {
	const user = event.context.user;
	const query = getQuery(event);

	if (!query.email) {
		return createError({
			status: 403,
			statusMessage: 'Error',
			message: 'Something missing email address'
		});
	}

	const inviteUser = await User.findOne({
		email: query.email
	});

	if (!inviteUser) {
		return createError({
			status: 404,
			statusMessage: 'Not found',
			message: 'User not found'
		});
	}

	if (user?._id?.toString() === inviteUser?._id?.toString()) {
		return createError({
			status: 400,
			statusMessage: 'Invalid user',
			message: 'You cannot invite yourself'
		});
	}

	return {
		status: 200,
		statusMessage: 'Success!',
		userId: inviteUser?.id
	};
});
