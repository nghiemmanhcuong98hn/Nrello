import mongoose from 'mongoose';

const BoardModal = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false,
			default: null
		},
		list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		coverImage: {
			type: String,
			required: false,
			default: null
		},
		backgroundIndex: {
			type: Number,
			default: null
		},
		order: {
			type: Number
		},
		managerUsers: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
	},
	{ timestamps: true }
);
const Board = mongoose.model('Board', BoardModal);
export default Board;
