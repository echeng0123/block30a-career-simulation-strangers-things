import TextField from "@mui/material/TextField";
import { useState } from "react";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function NewPostForm() {
	const [postTitle, setpostTitle] = useState("");
	const [postPrice, setpostPrice] = useState("");
	const [postDelivery, setpostDelivery] = useState(false);
	const [postDescription, setpostDescription] = useState("");

	const [successMessage, setSuccessMessage] = useState(null);

	async function handleSubmit(event) {
		event.preventDefault();
		// let postData = {
		// 	title: "title",
		// 	price: "test",
		// 	description: "test",
		// };
		// console.log("postData", postData);
		// const postDataJson = JSON.stringify(postData);
		// console.log("stringified postData", postDataJson);

		const tokenKey =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyMjgxYmJlYjkzNTAwMTRjNGNiMzAiLCJ1c2VybmFtZSI6ImNhciIsImlhdCI6MTY5MjU0MzAwM30.QajAa_4KC8k0RXbXZpqGG0NK3ElkU8MDWIS6aIbSmsM";

		try {
			const response = await fetch(`${API_URL}/posts`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenKey}`,
				},
				body: JSON.stringify({
					post: {
						title: "title",
						price: "test",
						description: "test",
					},
				}),
			});
			console.log("response from NPF: ", response);
			const result = await response.json();
			console.log("result from NPF: ", result);
			setSuccessMessage("Post submitted");
			// fetchAllPosts();
			// return postObj;
		} catch (err) {
			console.error("Oops, something went wrong with adding that post!", err);
		}
	}

	return (
		<>
			{successMessage && <p>{successMessage}</p>}
			<form onSubmit={handleSubmit}>
				<TextField
					label="Name"
					value={postTitle}
					onChange={(e) => setpostTitle(e.target.value)}
				/>
				<TextField
					label="Price"
					value={postPrice}
					onChange={(e) => setpostPrice(e.target.value)}
				/>
				<TextField
					label="Delivery Available"
					value={postDelivery}
					onChange={(e) => setpostDelivery(e.target.value)}
				/>
				<TextField
					label="Description"
					value={postDescription}
					onChange={(e) => setpostDescription(e.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
