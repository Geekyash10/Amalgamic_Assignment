const express = require("express");
const User = require("../models/user");
const Card = require("../models/card");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/basic", authMiddleware, async (req, res) => {
	try {
		const { name, dob, address } = req.body;

		if (!name || !dob || !address) {
			return res.status(400).json({ message: "All fields required" });
		}

		await User.findByIdAndUpdate(req.userId, { name, dob, address });

		res.json({ message: "Basic info saved" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.post("/verify", authMiddleware, async (req, res) => {
	try {
		const { otp } = req.body;

		if (otp !== "123456") {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		await User.findByIdAndUpdate(req.userId, { verified: true });

		res.json({ message: "User verified successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.post("/cards", authMiddleware, async (req, res) => {
	try {
		const user = await User.findById(req.userId);

		if (!user.verified) {
			return res.status(403).json({ message: "User not verified" });
		}

		const { cardNumber, expiryMonth, expiryYear } = req.body;

		if (!cardNumber || !expiryMonth || !expiryYear) {
			return res.status(400).json({ message: "All fields required" });
		}

		const card = new Card({
			userId: req.userId,
			cardNumber,
			expiryMonth,
			expiryYear,
		});
		await card.save();

		res.status(201).json({ message: "Card added successfully" });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

router.get("/cards", authMiddleware, async (req, res) => {
	try {
		const cards = await Card.find({ userId: req.userId });
		res.json({ cards });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
});

module.exports = router;
