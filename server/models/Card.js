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
		createdAt: {
			type: Date
		},
		updatedAt: {
			type: Date
		}
	},
	{
		timestamps: true
	}
);

const Card = mongoose.model('Card', CardModel);
export default Card;
