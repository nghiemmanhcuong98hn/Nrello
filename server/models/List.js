import mongoose from 'mongoose';

const ListModel = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		cards: [{ type: mongoose.Types.ObjectId }],
		board: {
			type: mongoose.Types.ObjectId,
			ref: 'Board',
			required: true
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{ timestamps: true }
);

const List = mongoose.model('List', ListModel);
export default List;
