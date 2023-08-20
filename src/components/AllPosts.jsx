// This component renders all (or filtered) posts available for buying and selling

import { useState, useEffect } from "react";
import { fetchAllPosts } from "../API/STindex";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../API/STindex";
import SignUpForm from "./SignUpForm";
import NewPostForm from "./NewPostForm";
import DeletePost from "./DeletePost";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function AllPosts({ userId, setUserId }) {
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const [searchParam, setSearchParam] = useState("");
	const navigate = useNavigate();

	const tokenKey =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyMjgxYmJlYjkzNTAwMTRjNGNiMzAiLCJ1c2VybmFtZSI6ImNhciIsImlhdCI6MTY5MjU0MzAwM30.QajAa_4KC8k0RXbXZpqGG0NK3ElkU8MDWIS6aIbSmsM";

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

	// show only posts by logged in user
	// const postsByUser = searchParam
	//     ? posts.filter(
	//         (post) =>
	//             post.author._id
	//     )

	// get data from NewPostForm once id of a post is known

	return (
		<div id="all-posts-container">
			<div id="all-posts-header">
				<h1>AVAILABLE LISTINGS</h1>
			</div>
			<div>
				<SignUpForm />
			</div>
			<div>
				<NewPostForm userId={userId} setUserId={setUserId} />
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
								<DeletePost />
							</div>
						</>
					);
				})}
			</div>
		</div>
	);
}
