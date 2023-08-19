// This component handles the verification/authentication of user account tokens. Will be called in other components that require authentication to work.

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
import { useState } from "react";

export default function Authenticate({ token, setToken }) {
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	async function handleClick() {
		try {
			const response = await fetch(`${API_URL}/users/me`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const result = await response.json();
			console.log("result from Auth", result);
			if (result.success) {
				setSuccessMessage(`User ${result.data.username} is authenticated.`);
			} else {
				setSuccessMessage(result.message);
				console.log(`token: ${token}`);
			}
			console.log("result: ", result);
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
