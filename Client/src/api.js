const API_URL = "http://localhost:5000";

export const signup = async (name, email, password) => {
	const res = await fetch(`${API_URL}/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ name, email, password }),
	});
	return res.json();
};

export const login = async (email, password) => {
	const res = await fetch(`${API_URL}/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	});
	return res.json();
};

export const saveBasicInfo = async (token, name, dob, address) => {
	const res = await fetch(`${API_URL}/user/basic`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ name, dob, address }),
	});
	return res.json();
};

export const verifyOTP = async (token, otp) => {
	const res = await fetch(`${API_URL}/user/verify`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ otp }),
	});
	return res.json();
};

export const addCard = async (token, cardNumber, expiryMonth, expiryYear) => {
	const res = await fetch(`${API_URL}/user/cards`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ cardNumber, expiryMonth, expiryYear }),
	});
	return res.json();
};

export const getCards = async (token) => {
	const res = await fetch(`${API_URL}/user/cards`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.json();
};
