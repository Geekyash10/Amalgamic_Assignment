const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		cardNumber: { type: String, required: true },
		expiryMonth: { type: String, required: true },
		expiryYear: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);
