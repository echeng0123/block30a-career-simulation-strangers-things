// This component renders the logged in user profile (doesn't appear if user is not logged in). It gets current User from the local storage by getting the user info from the application state and displaying user info with a token.

import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
	const { user: currentUser } = useSelector((state) => state.auth);

	if (!currentUser) {
		return <Navigate to="/login" />;
	}
	return (
		<div>
			<header>
				<h1>Profile for {currentUser.username}</h1>
			</header>
			<p>
				<strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
				{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
			</p>
			<p>
				<strong>Id:</strong> {currentUser.id}
			</p>
			<p>
				<strong>Email:</strong> {currentUser.email}
			</p>
		</div>
	);
}
