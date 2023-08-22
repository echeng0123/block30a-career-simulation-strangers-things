// This component allows the user to create an account.

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function SignUpForm() {
	const [token, setToken] = useState(null);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const userObj = {
		user: {
			username: username,
			password: password,
		},
	};

	async function handleSubmit(event) {
		event.preventDefault();

		try {
			if ({ username }.username.length >= 3) {
				const response = await fetch(`${API_URL}/users/register`, {
					method: "POST",
					body: JSON.stringify(userObj),
					headers: { "content-type": "application/json" },
				});
				const result = await response.json();
				setToken(result.data.token);
				setSuccessMessage("Sign up successful");
				navigate("/login");
			} else {
				alert("Username too short. Please enter at least 3 characters.");
				setUsername("");
				setPassword("");
				setToken("");
			}
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<div id="signin-container">
			<h2 id="login-text">Sign up</h2>
			{successMessage && <h2>{successMessage}</h2>}
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<div id="login-text">
					<label>
						Username:{" "}
						<input
							id="login-input"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</label>
					<br />
					<label>
						Password:{" "}
						<input
							id="login-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</label>
				</div>
				<br />
				<button id="login-button">Submit</button>
			</form>
		</div>
	);
}
