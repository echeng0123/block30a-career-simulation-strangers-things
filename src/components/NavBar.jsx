// This component is the navigation bar for the site
import { Link } from "react-router-dom";

export default function NavBar(currentUser) {
	return (
		<div id="navbar-container">
			<h1 id="site-header">Strangers Things</h1>
			<Link to="/home">Home</Link>
			<Link to="/posts">Posts</Link>
			{/* {currentUser && <Link to="/profile">Profile</Link>} */}
			{/* {currentUser && <Link to="/messages">Messages</Link>} */}
			{/* {currentUser && <Link to="/login">Logout</Link>} */}
			{/* <Link to="/login">Login</Link> */}
		</div>
	);
}
