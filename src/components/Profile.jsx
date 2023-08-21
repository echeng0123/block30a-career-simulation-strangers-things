// This component renders the logged in user profile.
import { fetchUserProfile } from "../API/STindex";
import { useState, useEffect } from "react";

export default function Profile() {
	const [userPosts, setUserPosts] = useState([]);
	const [profileUsername, setProfileUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");

	// pull user profile details with hardcoded token

	useEffect(() => {
		async function getUserProfile() {
			const response = await fetchUserProfile();
			if (response.success) {
				setUserPosts(response.data.posts);
				setProfileUsername(response.data.username);
				setUserId(response.data._id);
			} else {
				setError(response.error);
			}
		}
		getUserProfile();
	}, []);

	const userPostsToDisplay = searchParam
		? userPosts.filter(
				(post) =>
					post.title.toLowerCase().includes(searchParam) ||
					post.description.toLowerCase().includes(searchParam)
		  )
		: userPosts;

	return (
		<>
			<div>
				<h2>Welcome, {profileUsername}.</h2>
				<h3>Your user id is: {userId}</h3>
			</div>
			<div>
				<label>
					Search:{" "}
					<input
						type="text"
						placeholder="Search title or description"
						onChange={(event) =>
							setSearchParam(event.target.value.toLowerCase())
						}
					/>
				</label>
			</div>
			<div id="all-posts-gallery">
				{error && <p>{error}</p>}
				{userPostsToDisplay.map((post) => {
					return (
						<>
							<div id="each-post">
								<h3>{post.title}</h3>
								<h5>Seller: {post.author.username}</h5>
								<h5 id="post-price">Price: {post.price}</h5>
								<h5>Location: {post.location}</h5>
								<h5>Delivery Available: {post.willDeliver ? "Yes" : "No"}</h5>
								<p id="post-description">{post.description}</p>
								<button>Message</button>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
