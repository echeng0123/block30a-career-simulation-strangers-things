// This component allows the user to create an account.

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit } from "../redux/authSlice";

// const cohortName = "2306-GHP-ET-WEB-FT-SF";
// const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function SignUpForm() {
	// const [token, setToken] = useState(null);
	// const [username, setUsername] = useState("");
	// const [password, setPassword] = useState("");
	// const [successMessage, setSuccessMessage] = useState(null);
	// const [error, setError] = useState(null);

	// const userObj = {
	// 	user: {
	// 		username: username,
	// 		password: password,
	// 	},
	// };

	// async function handleSubmit(event) {
	// 	event.preventDefault();
	// 	// console.log("userObj is ", userObj);
	// 	try {
	// 		if ({ username }.username.length >= 3) {
	// 			const response = await fetch(`${API_URL}/users/register`, {
	// 				method: "POST",
	// 				body: JSON.stringify(userObj),
	// 				headers: { "content-type": "application/json" },
	// 			});
	// 			const result = await response.json();
	// 			setToken(result.data.token);
	// 			console.log("result from signing up ", result);
	// 			console.log("result.data.token is now: ", result.data.token);

	// 			setSuccessMessage("Sign up successful");
	// 		} else {
	// 			alert("Username too short. Please enter at least 3 characters.");
	// 			setUsername("");
	// 			setPassword("");
	// 			setToken("");
	// 		}
	// 	} catch (error) {
	// 		setError(error.message);
	// 	}
	// }

	// state variables for input fields
	const [depositAmount, setDepositAmount] = useState(0);

	// access balance from redux store
	const balance = useSelector((state) => state.account.balance);
	const dispatch = useDispatch();

	// Event handler for deposit action
	const handleDeposit = () => {
		dispatch(deposit({ amount: Number(depositAmount) })); // Dispatch deposit action with the entered deposit amount
		setDepositAmount(0); // Reset deposit amount after deposit action is dispatched
	};

	return (
		<>
			<div className="balance-container">
				<h2>Current Balance: </h2>
				<h2 style={{ color: balance < 0 ? "red" : "#71D50E" }} id="balance-amt">
					$ {balance.toLocaleString("en-US", { maximumFractionDigits: 2 })}
				</h2>
				<div className="transaction-container">
					<h3>Deposit</h3>
					<input
						id="input-box"
						type="number"
						value={depositAmount}
						onChange={(e) => setDepositAmount(e.target.value)}
					/>
					<button onClick={handleDeposit}>Deposit</button>
				</div>
			</div>
			{/* <h2>Sign up</h2>
			{successMessage && <p>{successMessage}</p> && (
				<p>your token is {token}</p>
			)}
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
			</form> */}
			{/* {props.handleCallback(token)} */}
		</>
	);
}
