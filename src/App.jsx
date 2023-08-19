import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import NavBar from "./components/NavBar";

import { logout } from "./components/slices/authSlice";

import AuthVerify from "./common/AuthVerify";

export default function App() {
	console.log("you've made it to App");
	// const { user: currentUser } = useSelector((state) => state.auth);
	// const dispatch = useDispatch();
	// console.log("I'm in App currentUser", currentUser);

	// const logOut = useCallback(() => {
	// 	dispatch(logout());
	// }, [dispatch]);

	// useEffect(() => {
	// 	if (currentUser) {
	// 		<h1>user is logged in</h1>;
	// 	} else {
	// 		<h1>user is not logged in</h1>;
	// 	}
	// }, [currentUser]);
	return (
		<Router>
			<div>
				<nav>{/* <NavBar currentUser={currentUser} /> */}</nav>
				<div>
					<Routes>
						{/* <Route path="/" element={<Home />} /> */}
						<Route path="/home" element={<Home />} />
						{/* <Route path="/login" element={<Login />} /> */}
						{/* <Route path="/register" element={<Register />} /> */}
						{/* <Route path="/profile" element={<Profile />} /> */}
						{/* <Route path="/user" element={<BoardUser />} /> */}
					</Routes>
				</div>

				{/* <AuthVerify logOut={logOut} /> */}
			</div>
		</Router>
	);
}
