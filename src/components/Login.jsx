// This component allows a user to log in and verifies if they have logged in successfully

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ token, setToken }) {
	const [enterUsername, setEnterUsername] = useState("");
	const [enterPassword, setEnterPassword] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	async function handleClick() {
		// console.log("entered username", enterUsername);
		// console.log("entered password", enterPassword);
		console.log("token", token);
		try {
			const response = await fetch(`${API_URL}/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user: {
						username: `${enterUsername}`,
						password: `${enterPassword}`,
					},
				}),
			});
			const result = await response.json();
			console.log("result from Login ", result);
			console.log(`result stringified ${JSON.stringify(result)}`);
			if (result.success) {
				setSuccessMessage("Successfully logged in");
				navigate("/posts");
			}
			return result;
		} catch (error) {
			console.error("Problems logging in", error);
			setError(error);
		}
	}

	return (
		<div>
			<form onSubmit={handleClick}>
				<label>
					Username:{" "}
					<input
						value={enterUsername}
						onChange={(e) => setEnterUsername(e.target.value)}
					/>
				</label>
				<br />
				<label>
					Password:{" "}
					<input
						value={enterPassword}
						onChange={(e) => setEnterPassword(e.target.value)}
					/>
				</label>
				<br></br>
				<button>Submit</button>
			</form>
		</div>
	);
}
