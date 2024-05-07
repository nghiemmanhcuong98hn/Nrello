import mongoose from 'mongoose';

const CardModel = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxLength: 255
		},
		description: {
			type: String,
			default: null
		},
		owner: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		list: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'List'
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date
		},
		isDone: {
			type: Boolean
		}
	},
	{
		timestamps: true
	}
);

const Card = mongoose.model('Card', CardModel);
export default Card;
