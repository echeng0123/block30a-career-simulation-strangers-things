// This component renders the logged in user profile.
import { fetchAllPosts, fetchUserProfile } from "../API/STindex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../API/STindex";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";

export default function Profile() {
	const [userPosts, setUserPosts] = useState([]);
	const [profileUsername, setProfileUsername] = useState("");
	const [userId, setUserId] = useState("");
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");

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
				setProfileUsername(response.data.username);
				setUserId(response.data._id);
			} else {
				setError(response.error);
				navigate("/posts");
			}
		}
		getUserProfile();
	}, []);

	async function handleDelete(event, postIdA) {
		event.preventDefault();
		console.log("entering handledelete");

		const postIdB = postIdA;
		const tokenB = tokenA;
		console.log("postIdB is", postIdB);

		try {
			const result = await deletePost(postIdB, tokenB);
			console.log("result from handle delete", result);
			// navigate("/profile");
		} catch (error) {
			console.error(error);
		}
	}

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
			<div id="your-posts-header">
				<h2>Your Active Listings: </h2>
			</div>
			<div id="all-posts-gallery">
				{error && <p>{error}</p>}
				{userPosts.map((post) => {
					const postIdA = post._id;
					if (post.author == userId) {
						return (
							<>
								<div id="each-post">
									<h3>{post.title}</h3>
									<h5>Seller: {post.author.username}</h5>
									<h5 id="post-price">Price: {post.price}</h5>
									<h5>Location: {post.location}</h5>
									<h5>Delivery Available: {post.willDeliver ? "Yes" : "No"}</h5>
									<p id="post-description">{post.description}</p>
									<p>postid: {postIdA}</p>
									<button
										onSubmit={(event, postIdA) => handleDelete(event, postIdA)}
									>
										Delete Post
									</button>
									<div>
										<EditPost postId={postIdA} />
									</div>
								</div>
							</>
						);
					} else {
						return (
							<div key={postIdA}>
								<h1>You have no active posts.</h1>
							</div>
						);
					}
				})}
			</div>
		</>
	);
}
