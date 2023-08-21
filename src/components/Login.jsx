// This function allows the user to log into the site.

// This component allows a user to log in and verifies if they have logged in successfully

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/authSlice";

export default function Login() {
	// state variables for input fields
	const [enterUsername, setEnterUsername] = useState("");
	const [enterPassword, setEnterPassword] = useState("");

	const [successMessage, setSuccessMessage] = useState(null);
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	// access balance from redux store
	// const userA = useSelector((state) => state);
	// const tokenA = useSelector((state) => state);

	// console.log("userA", userA);
	// console.log("tokenA", tokenA);

	// get current userInfo from redux store
	const dispatch = useDispatch();

	// event handler for login action
	async function handleClick(event) {
		event.preventDefault();
		console.log("entered handleClick");
		try {
			console.log("you've entered the try");
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
			dispatch(
				register({
					user: enterUsername,
					token: result.data.token,
				})
			);
			if (result.success) {
				setSuccessMessage("Successfully logged in");
				navigate(`/profile`);
			}
		} catch (error) {
			// alert("Unable to login");
			console.error("Problems logging in ", error);
			setError(error);
		}
	}

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={(event) => handleClick(event)}>
				<div>
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
				</div>
				<br />
				<button>Submit</button>
			</form>
		</div>
	);
}
