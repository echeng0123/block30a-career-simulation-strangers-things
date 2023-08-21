// This component loads the "main content" of the site that renders when the user clicks on the different links in the navbar. It handles the routing for the site.

import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import AllPosts from "./AllPosts";
import Profile from "./Profile";
import Messages from "./Messages";
import Login from "./Login";
import Home from "./Home";

export default function MainSection() {
	const [token, setToken] = useState(null); // tracking user id through props for all components

	return (
		<div id="main-section">
			<Routes>
				<Route
					path="/home"
					element={<Home token={token} setToken={setToken} />}
				/>
				<Route
					path="/posts"
					element={<AllPosts token={token} setToken={setToken} />}
				/>
				<Route path="/profile" element={<Profile />} />
				<Route path="/messages" element={<Messages />} />
				<Route
					path="/login"
					element={<Login token={token} setToken={setToken} />}
				/>
				{/* conditionally render login component text */}
			</Routes>
		</div>
	);
}
