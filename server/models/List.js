import mongoose from 'mongoose';

const ListModel = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		cards: [{ type: mongoose.Types.ObjectId, ref: 'Card' }],
		board: {
			type: mongoose.Types.ObjectId,
			ref: 'Board',
			required: true
		},
		owner: {
			type: mongoose.Types.ObjectId,
			ref: 'User',
			required: true
		},
		headerBg: {
			type: String,
			default: null
		}
	},
	{ timestamps: true }
);

const List = mongoose.model('List', ListModel);
export default List;
