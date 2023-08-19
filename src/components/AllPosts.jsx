// This component renders all (or filtered) posts available for buying and selling

import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API/STindex";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");

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
		</div>
	);
}
