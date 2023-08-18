// This component renders all (or filtered) posts available for buying and selling

import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API/STindex";
import SeePostDetails from "./SeePostDetails";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [selectedPostId, setSelectedPostId] = useState(null);
	const [searchParam, setSearchParam] = useState("");

	useEffect(() => {
		async function getAllPosts() {
			const APIResponse = await fetchAllPosts();
			if (APIResponse.success) {
				setPosts(APIResponse.data.posts);
				console.log("posts from GAP", posts);
			} else {
				setError(APIResponse.error.message);
			}
		}
		getAllPosts();
	}, []);

	return (
		<div id="all-posts-container">
			<div id="all-posts-header">
				<h4>BUY AND SELL POSTS</h4>
			</div>
			<div id="all-posts-gallery">
				{error && <p>{error}</p>}
				{posts.map((post) => {
					return (
						<>
							<div id="each-post">
								<h3>{post.title}</h3>
								<h5>Seller: {post.author.username}</h5>
								<h5 id="post-price">Price: {post.price}</h5>
								<SeePostDetails
									key={post._id}
									post={post}
									posts={posts}
									selectedPostId={post.id}
									setSelectedPostId={setSelectedPostId}
								/>
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
