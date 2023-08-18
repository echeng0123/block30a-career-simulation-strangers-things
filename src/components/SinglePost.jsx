// This component handles the conditional rendering of the See Details page for the posts

import { useState, useEffect } from "react";
import { fetchSinglePost } from "../API/STindex";
import PostCard from "./PostCard";

export default function SinglePost({ selectedPostId, setSelectedPostId }) {
	const [post, setPost] = useState({});
	const [error, setError] = useState(null);

	useEffect(() => {
		async function getSinglePost() {
			try {
				setPost(await fetchSinglePost(selectedPostId));
			} catch (err) {
				console.error("Can't get this puppy", err);
			}
		}
		getSinglePost();
	}, [selectedPostId]);
	console.log("post from SP", post);
	console.log("title from SP", post.title);

	return (
		<div>
			{error && <p>{error}</p>}
			<h1>test</h1>
			{post && (
				<PostCard
					title={post.title}
					location={post.location}
					delivery={post.willDeliver}
					description={post.description}
				/>
			)}
		</div>
	);
}
