// This component renders all (or filtered) posts available for buying and selling

import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API/STindex";

export default function AllPosts() {
	const [posts, setPosts] = useState([]);
	const [selectedPostId, setSelectedPostId] = useState(null);

	async function getAllPosts() {
		try {
			setPosts(await fetchAllPosts());
		} catch (err) {
			console.error("Can't get all posts", err);
		}
	}

	useEffect(() => {
		getAllPosts();
	}, []);

	return (
		<div id="all-posts-container">
			<div id="all-posts-header">
				<h4>BUY AND SELL POSTS</h4>
			</div>
			<div id="all-posts-gallery">
				{posts.map((post) => {
					return (
						<>
							<div id="each-post">
								<h3>{post.title}</h3>
								<h5>Seller: {post.author.username}</h5>
								<h5 id="post-price">Price: {post.price}</h5>
								<h5>Location: {post.location}</h5>
								<h5>Delivery Available: {post.willDeliver ? "Yes" : "No"}</h5>
								<p id="post-description">{post.description}</p>
								{/* <img src={post.imageUrl} alt="dog" /> */}
								{/* <SeeDetails
									selectedPuppyId={player.id}
									setSelectedPuppyId={setSelectedPuppyId}
								/> */}
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
