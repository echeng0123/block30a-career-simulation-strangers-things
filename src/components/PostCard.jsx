// This component renders the single post details
// import { deletePost } from "./API/STindex";

export default function PostCard({ title, location, delivery, description }) {
	console.log("title", title);
	// async function handleDelete() {
	// 	try {
	// 		const result = await deletePost(post.id);
	// 		console.log(result);
	// 		navigate("/");
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// }

	return (
		<div>
			<h3>{title}</h3>
			<h5>Location: {location}</h5>
			<h5>Delivery Available: {delivery ? "Yes" : "No"}</h5>
			<p id="post-description">{description}</p>
			{/* <button onClick={handleDelete}>Remove Post</button> */}
		</div>
	);
}
