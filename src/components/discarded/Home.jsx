// This component is the home page/landing page for the site. The landing for the page conditionally renders text depending on whether or not a user is logged in.

// import SignUpForm from "./SignUpForm";
// import Authenticate from "./Authenticate";
// import store from "../store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/authSlice";

function Home() {
	// // console.log("Initial state: ", store.getState());
	// // const [tokenId, setTokenId] = useState(null);
	const [usernameNew, setUsernameNew] = useState("");
	const [passwordNew, setPasswordNew] = useState("");

	// // Access token from Redux store
	// // const token = useSelector((state) => state.user.token);
	// const username = useSelector((state) => state.user.username);
	// const password = useSelector((state) => state.user.password);
	// // console.log("token in Home", token);
	// const dispatch = useDispatch();

	// // Event handler for the register action
	function handleRegister() {
		// dispatch(register({ username: usernameNew, password: passwordNew }));
		// 	// console.log("token", userToken);
		console.log("pw", passwordNew);
		console.log("username", usernameNew);
		setPasswordNew("");
		setUsernameNew("");
	}

	return (
		<>
			<h1>this is home</h1>
			<div>
				<h3>Sign Up Form</h3>
				<div>
					<h5>Username: </h5>
					<div>
						<label htmlFor="username">Username: </label>
						<input
							type="text"
							value={usernameNew}
							onChange={(event) => setUsernameNew(event.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="password">Password: </label>
						<input
							type="text"
							value={passwordNew}
							onChange={(event) => setPasswordNew(event.target.value)}
						/>
					</div>
					<button onClick={handleRegister}>Create Account</button>
				</div>
			</div>
		</>
	);
}

export default Home;
