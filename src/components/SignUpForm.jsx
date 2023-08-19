// This component handles the creation of a new user account

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
import { useState } from "react";

export default function SignUpForm({ token, setToken }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	const userObj = {
		user: {
			username: username,
			password: password,
		},
	};

	async function handleSubmit(event) {
		event.preventDefault();
		console.log("userObj is ", userObj);
		try {
			if ({ username }.username.length >= 3) {
				const response = await fetch(`${API_URL}/users/register`, {
					method: "POST",
					body: JSON.stringify(userObj),
					headers: { "content-type": "application/json" },
				});
				const result = await response.json();
				setToken(result.token);
				// console.log("result from signing up ", result);
				// console.log("token is now: ", result.data.token);
				result.success
					? setSuccessMessage("Sign up successful")
					: setSuccessMessage("Unable to sign up");
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
		<>
			<h2>Sign up</h2>
			{successMessage && <p>{successMessage}</p>}
			{error && <p>{error}</p>}
			<form onSubmit={handleSubmit}>
				<label>
					Username:{" "}
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:{" "}
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</label>
				<br></br>
				<button>Submit</button>
			</form>
		</>
	);
}
