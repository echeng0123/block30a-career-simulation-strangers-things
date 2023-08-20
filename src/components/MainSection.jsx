// This component loads the "main content" of the site that renders when the user clicks on the different links in the navbar. It handles the routing for the site.

import { Routes, Route } from "react-router-dom";
import AllPosts from "./AllPosts";
import Profile from "./Profile";
import Messages from "./Messages";
// import Login from "./Login";
import Home from "./Home";
// import SignUpForm from "./SignUpForm";

export default function MainSection({ userId, setUserId }) {
	// function CallBack(userId) {
	// 	return (
	// 		<>
	// 			{userId}
	// 			<div>
	// 				<p>the current userid is {userId}</p>
	// 			</div>
	// 		</>
	// 	);
	// }

	return (
		<div id="main-section">
			<Routes>
				<Route path="/home" element={<Home />} />
				<Route
					path="/posts"
					element={
						<AllPosts
							userId={userId}
							setUserId={setUserId}
							// userId={userId}
							// setUserId={setUserId}
							// handleCallback={CallBack}
						/>
					}
				/>
				<Route path="/profile" element={<Profile />} />
				<Route path="/messages" element={<Messages />} />
				{/* <Route path="/login" element={<Login />} /> */}
				{/* conditionally render login component text */}
			</Routes>
		</div>
	);
}
