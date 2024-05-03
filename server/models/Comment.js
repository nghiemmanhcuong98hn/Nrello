import mongoose from 'mongoose';

const commentModel = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
			maxLength: 255
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: 'User'
		},
		card: {
			type: mongoose.Types.ObjectId,
			ref: 'Card'
		}
	},
	{
		timestamps: true
	}
);

const Comment = mongoose.model('Comment', commentModel);
export default Comment;
