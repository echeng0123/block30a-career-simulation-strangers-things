// This component renders the logged in user profile.
import { fetchUserProfile } from "../API/STindex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import EditPost from "./EditPost";
import DeletePost from "./DeletePost";
import MessagePanel from "./MessagePanel";

export default function Profile() {
	const [userPosts, setUserPosts] = useState([]);
	const [userMessages, setUserMessages] = useState([]);
	const [profileUsername, setProfileUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");
	const [searchMessageParam, setSearchMessageParam] = useState("");

	const navigate = useNavigate();

	// access current state from redux store
	const userA = useSelector((state) => state.user.user);
	const tokenA = useSelector((state) => state.user.token);

	// console.log("tokenA from profile", tokenA);

	useEffect(() => {
		async function getUserProfile() {
			const response = await fetchUserProfile(tokenA);
			if (response.success) {
				setUserPosts(response.data.posts);
				setUserMessages(response.data.messages);
				setProfileUsername(response.data.username);
				setUserId(response.data._id);
			} else {
				setError(response.error);
				navigate("/login");
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

	const userMessagesToDisplay = searchMessageParam
		? userMessages.filter(
				(message) =>
					message.post.title.toLowerCase().includes(searchMessageParam) ||
					message.content.toLowerCase().includes(searchMessageParam)
		  )
		: userMessages;

	return (
		<>
			<div id="profile-header-small">
				<h1>Welcome, {profileUsername}.</h1>
				<h3>Your user id is: {userId}</h3>
			</div>
			<div id="profile-content">
				<div id="messages-section-profile">
					<div>
						<MessagePanel />
					</div>
				</div>
				<div id="posts-section-profile">
					<div id="your-posts-header">
						<h2>Your Active Listings: </h2>
					</div>
					<div>
						<label>
							Search your active posts:{" "}
							<input
								id="search-messages"
								type="text"
								placeholder="Search title or description"
								onChange={(event) =>
									setSearchParam(event.target.value.toLowerCase())
								}
							/>
						</label>
					</div>
					<div id="user-posts-gallery">
						{error && <p>{error}</p>}
						{userPostsToDisplay.map((post) => {
							const postIdA = post._id;
							if (post.active) {
								return (
									<>
										<div id="each-post">
											<h3 id="your-post-heading">{post.title}</h3>
											<h5>Seller: {post.author.username}</h5>
											<h5 id="post-price">Price: {post.price}</h5>
											<h5>Location: {post.location}</h5>
											<h5>
												Delivery Available: {post.willDeliver ? "Yes" : "No"}
											</h5>
											<p id="post-description">{post.description}</p>
											<div>
												<EditPost postId={postIdA} />
												<DeletePost postId={postIdA} />
											</div>
										</div>
									</>
								);
							} else {
								return <></>;
							}
						})}
					</div>
				</div>
			</div>
		</>
	);
}
