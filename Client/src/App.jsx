import React, { useState, useEffect } from "react";
import {
	signup,
	login,
	saveBasicInfo,
	verifyOTP,
	addCard,
	getCards,
} from "./api";
import "./App.scss";

function App() {
	const [token, setToken] = useState(localStorage.getItem("token") || "");
	const [step, setStep] = useState("login");
	const [message, setMessage] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [dob, setDob] = useState("");
	const [address, setAddress] = useState("");
	const [otp, setOtp] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [expiryMonth, setExpiryMonth] = useState("");
	const [expiryYear, setExpiryYear] = useState("");
	const [cards, setCards] = useState([]);

	useEffect(() => {
		if (token) localStorage.setItem("token", token);
	}, [token]);

	const isValidDob = (d) => {
		if (!d) return false;
		const parsed = new Date(`${d}T00:00:00`);
		if (Number.isNaN(parsed.getTime())) return false;
		const today = new Date();
		parsed.setHours(0, 0, 0, 0);
		today.setHours(0, 0, 0, 0);
		return parsed <= today;
	};

	const isValidMonth = (mm) => /^(0[1-9]|1[0-2])$/.test(mm);
	const isValidYear = (yy) => /^\d{4}$/.test(yy);

	const handleMonthChange = (e) => {
		const v = e.target.value.replace(/\D/g, "").slice(0, 2);
		setExpiryMonth(v);
	};

	const handleSignup = async (e) => {
		e.preventDefault();
		const res = await signup(name, email, password);
		setMessage(res.message);
		if (res.message === "User created successfully") setStep("login");
	};
	const handleLogin = async (e) => {
		e.preventDefault();
		const res = await login(email, password);
		if (res.token) {
			setToken(res.token);
			setMessage("");
			const cardsRes = await getCards(res.token);
			if (cardsRes.cards && cardsRes.cards.length > 0) {
				setCards(cardsRes.cards);
				setStep("viewCards");
			} else {
				setStep("basic");
			}
		} else {
			setMessage(res.message);
		}
	};

	const handleBasicInfo = async (e) => {
		e.preventDefault();
		if (!isValidDob(dob)) {
			setMessage(
				"Invalid date of birth. Please enter a valid past date."
			);
			return;
		}
		const res = await saveBasicInfo(token, name, dob, address);
		setMessage(res.message);
		if (res.message === "Basic info saved") setStep("verify");
	};

	const handleVerify = async (e) => {
		e.preventDefault();
		const res = await verifyOTP(token, otp);
		setMessage(res.message);
		if (res.message === "User verified successfully") setStep("addCard");
	};

	const handleAddCard = async (e) => {
		e.preventDefault();
		if (!isValidMonth(expiryMonth)) {
			setMessage("Expiry month must be between 01 and 12.");
			return;
		}
		if (!isValidYear(expiryYear)) {
			setMessage("Expiry year must be 4 digits.");
			return;
		}
		const res = await addCard(token, cardNumber, expiryMonth, expiryYear);
		setMessage(res.message);
		if (res.message === "Card added successfully") {
			setCardNumber("");
			setExpiryMonth("");
			setExpiryYear("");
			setStep("viewCards");
			loadCards();
		}
	};

	const loadCards = async (tkn) => {
		const t = tkn || token;
		if (!t) return;
		const res = await getCards(t);
		if (res.cards) setCards(res.cards);
		else if (res.message) setMessage(res.message);
	};

	const logout = () => {
		setToken("");
		localStorage.removeItem("token");
		setStep("login");
		setCards([]);
	};

	const todayStr = new Date().toISOString().split("T")[0];

	return (
		<div className="container">
			<h2>Onboarding App</h2>
			{message && <div className="message">{message}</div>}

			{step === "signup" && (
				<form className="form" onSubmit={handleSignup}>
					<h3>Sign Up</h3>
					<input
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit">Sign Up</button>
					<span className="link" onClick={() => setStep("login")}>
						Already have an account? Login
					</span>
				</form>
			)}

			{step === "login" && (
				<form className="form" onSubmit={handleLogin}>
					<h3>Login</h3>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit">Login</button>
					<span className="link" onClick={() => setStep("signup")}>
						Don't have an account? Sign Up
					</span>
				</form>
			)}

			{step === "basic" && (
				<form className="form" onSubmit={handleBasicInfo}>
					<h3>Step 1: Basic Info</h3>
					<input
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<input
						type="date"
						placeholder="Date of Birth"
						max={todayStr}
						value={dob}
						onChange={(e) => setDob(e.target.value)}
						required
					/>
					<input
						placeholder="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
					/>
					<button type="submit">Next</button>
				</form>
			)}

			{step === "verify" && (
				<form className="form" onSubmit={handleVerify}>
					<h3>Step 2: Verify OTP</h3>
					<p>Enter OTP: 123456</p>
					<input
						placeholder="OTP"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
						required
					/>
					<button type="submit">Verify</button>
				</form>
			)}

			{step === "addCard" && (
				<form className="form" onSubmit={handleAddCard}>
					<h3>Step 3: Add Card</h3>
					<input
						placeholder="Card Number"
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
						required
					/>
					<input
						type="text"
						inputMode="numeric"
						pattern="(0[1-9]|1[0-2])"
						maxLength={2}
						placeholder="Expiry Month (MM)"
						value={expiryMonth}
						onChange={handleMonthChange}
						required
						title="Enter month as 01 to 12"
					/>
					<input
						type="text"
						inputMode="numeric"
						pattern="\d{4}"
						maxLength={4}
						placeholder="Expiry Year (YYYY)"
						value={expiryYear}
						onChange={(e) =>
							setExpiryYear(
								e.target.value.replace(/\D/g, "").slice(0, 4)
							)
						}
						required
						title="Enter 4-digit year"
					/>
					<button type="submit">Add Card</button>
				</form>
			)}

			{step === "viewCards" && (
				<div>
					<h3>Dashboard</h3>
					<div className="cards-grid">
						<div
							key="add-card-tile"
							className="card add-card"
							onClick={() => setStep("addCard")}
							style={{ cursor: "pointer" }}
						>
							<p className="add-title">+ Add One Card</p>
						</div>
						{cards.length === 0 ? (
							<p>No cards added yet</p>
						) : (
							cards.map((card) => (
								<div key={card._id} className="card">
									<p>
										Card: **** **** ****{" "}
										{card.cardNumber.slice(-4)}
									</p>
									<p>
										Expires: {card.expiryMonth}/
										{card.expiryYear}
									</p>
								</div>
							))
						)}
					</div>
					<button className="logout-btn" onClick={logout}>
						Logout
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
