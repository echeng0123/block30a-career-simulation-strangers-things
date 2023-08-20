// This function authenticates if a user is logged in or not.

import { useState } from "react";
const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function Authenticate({ token, setToken }) {
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	async function handleClick() {
		try {
			const response = await fetch(`${API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			console.log("authentication result", result.message);
			if (result.success) {
				setSuccessMessage(
					`User ${result.data.username} is successfully authenticated`
				);
			} else {
				setSuccessMessage(result.message);
				console.log(`token: ${token}`);
			}
			console.log("result from authenticate: ", result);
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<>
			<h2>Authenticate</h2>
			{successMessage && <p>{successMessage}</p>}
			{error && <p>{error}</p>}
			<button onClick={handleClick}>Authenticate Token</button>
		</>
	);
}
