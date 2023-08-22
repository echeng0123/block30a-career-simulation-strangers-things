// This component is the navigation bar for the site
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
	// access current state from redux store
	const tokenN = useSelector((state) => state.user.token);

	return (
		<div id="navbar-container">
			<Link to="/home">Home</Link>
			<Link to="/posts">Posts</Link>
			<Link to="/profile">Profile</Link>
			<Link to="/messages">Messages</Link>
			{tokenN ? (
				<Link to="/logout">Logout</Link>
			) : (
				<Link to="/login">Login</Link>
			)}
		</div>
	);
}
