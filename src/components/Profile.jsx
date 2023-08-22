// This component renders the logged in user profile.
import { fetchAllPosts, fetchUserProfile } from "../API/STindex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

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

	const userMessagesToDisplay = searchParam
		? userMessages.filter(
				(message) =>
					message.post.title.toLowerCase().includes(searchMessageParam) ||
					message.content.toLowerCase().includes(searchMessageParam)
		  )
		: userMessages;

	return (
		<>
			<div>
				<h1>Welcome, {profileUsername}.</h1>
				<h3>Your user id is: {userId}</h3>
			</div>
			<div>
				<label>
					Search your active posts:{" "}
					<input
						type="text"
						placeholder="Search title or description"
						onChange={(event) =>
							setSearchParam(event.target.value.toLowerCase())
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Search your sent messages:{" "}
					<input
						type="text"
						placeholder="Search title or description"
						onChange={(event) =>
							setSearchMessageParam(event.target.value.toLowerCase())
						}
					/>
				</label>
			</div>
			<div id="your-posts-header">
				<h2>Your Active Listings: </h2>
			</div>
			<div id="all-posts-gallery">
				{error && <p>{error}</p>}
				{userPostsToDisplay.map((post) => {
					const postIdA = post._id;
					if (post.active) {
						return (
							<>
								<div id="each-post">
									<h3>{post.title}</h3>
									<h5>Seller: {post.author.username}</h5>
									<h5 id="post-price">Price: {post.price}</h5>
									<h5>Location: {post.location}</h5>
									<h5>Delivery Available: {post.willDeliver ? "Yes" : "No"}</h5>
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
			<div id="messages-panel">
				{error && <p>{error}</p>}
				{userMessagesToDisplay.map((message) => {
					const messageTitle = message.post.title;
					// const messagePostId = message.post._id;
					const messageContent = message.content;

					return (
						<>
							<div id="each-message">
								<h3>Re: Post: {messageTitle}</h3>
								<p id="message-description">{messageContent}</p>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}
