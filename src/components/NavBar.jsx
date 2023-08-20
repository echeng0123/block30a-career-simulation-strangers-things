// This component is the navigation bar for the site
import { Link } from "react-router-dom";

export default function NavBar() {
	return (
		<div id="navbar-container">
			<h1 id="site-header">Strangers Things</h1>
			<Link to="/home">Home</Link>
			<Link to="/posts">Posts</Link>
			{/* <Link to="/profile">Profile</Link> */}
			{/* <Link to="/messages">Messages</Link> */}
			{/* <Link to="/login">Login</Link> */}
			{/* conditionally render login component text */}
		</div>
	);
}
