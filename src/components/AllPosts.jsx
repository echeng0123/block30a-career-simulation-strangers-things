// This component renders all (or filtered) posts available for buying and selling

import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API/STindex";
import NewPostForm from "./NewPostForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { deletePost } from "../API/STindex";
import EditPost from "./EditPost";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");

	const navigate = useNavigate();

	// access current state from redux store
	const userA = useSelector((state) => state.user.user);
	const tokenA = useSelector((state) => state.user.token);

	useEffect(() => {
		async function getAllPosts() {
			const APIResponse = await fetchAllPosts();
			if (APIResponse.success) {
				setPosts(APIResponse.data.posts);
			} else {
				setError(APIResponse.error.message);
			}
		}
		getAllPosts();
	}, []);

	async function handleDelete(event, postIdAP) {
		console.log("entering handleDelete in AP");
		event.preventDefault();

		try {
			const result = await deletePost(postIdAP, tokenA);
			console.log(result);
			navigate("/posts");
		} catch (error) {
			console.error(error);
		}
	}

	async function handleEditClick(event) {
		console.log("entering handle edit click");
		event.preventDefault();

		try {
			<EditPost />;
		} catch (err) {
			console.error("can't edit post", err);
		}
	}

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
				{error && <p>{error}</p>}
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
								<p>postId is {post._id}</p>
								{/* <button
									onSubmit={(event, postIdAP) => handleDelete(event, postIdAP)}
								>
									Delete Post
								</button> */}
								<button onClick={handleEditClick}>Edit Post</button>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
