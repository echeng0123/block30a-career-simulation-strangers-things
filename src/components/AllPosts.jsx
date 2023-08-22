// This component renders all (or filtered) posts available for buying and selling

import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API/STindex";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deletePost } from "../API/STindex";
import { currentUser, currentToken } from "../redux/authSlice";
import { fetchUserProfile } from "../API/STindex";

import NewPostForm from "./NewPostForm";
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");
	const [APuserId, setAPuserId] = useState("");
	const [APusername, setAPusername] = useState("");

	const navigate = useNavigate();

	// access current state from redux store
	const userD = useSelector(currentUser);
	const tokenD = useSelector(currentToken);

	// render all posts
	useEffect(() => {
		async function getAllPosts() {
			const APIResponse = await fetchAllPosts();
			if (APIResponse.success) {
				setPosts(APIResponse.data.posts);
			} else {
				setError(APIResponse.error.message);
				console.log("error loading posts page");
			}
		}
		getAllPosts();
	}, []);

	// get user profile details to conditionally render edit, delete buttons on only posts that are authored by the logged in user
	useEffect(() => {
		async function getUserProfile() {
			const response = await fetchUserProfile(tokenD);
			if (response.success) {
				setAPusername(response.data.username);
				setAPuserId(response.data._id);
				console.log("APUserId: ", APuserId);
			} else {
				setError(response.error);
				navigate("/posts");
			}
		}
		getUserProfile();
	}, []);

	const postsToDisplay = searchParam
		? posts.filter(
				(post) =>
					post.title.toLowerCase().includes(searchParam) ||
					post.description.toLowerCase().includes(searchParam)
		  )
		: posts;

	return (
		<div id="all-posts-container">
			<div id="all-posts-header">
				<h1>AVAILABLE LISTINGS</h1>
			</div>

			<div>
				<NewPostForm />
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
				{postsToDisplay.map((post) => {
					const postIdAP = post._id;
					return (
						<>
							<div id="each-post">
								<h3>{post.title}</h3>
								<h5>Seller: {post.author.username}</h5>
								<h5 id="post-price">Price: {post.price}</h5>
								<h5>Location: {post.location}</h5>
								<h5>Delivery Available: {post.willDeliver ? "Yes" : "No"}</h5>
								<p id="post-description">{post.description}</p>

								{APusername == post.author.username ? (
									<div>
										<EditPost postId={postIdAP} />
										<DeletePost postId={postIdAP} />
									</div>
								) : (
									<></>
								)}
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
