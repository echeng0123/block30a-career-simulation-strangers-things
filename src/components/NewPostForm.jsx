import TextField from "@mui/material/TextField";
import { useState } from "react";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function NewPostForm({ token, setToken }) {
	const [postTitle, setpostTitle] = useState("");
	const [postPrice, setpostPrice] = useState("");
	const [postLocation, setpostLocation] = useState("");
	const [postDelivery, setpostDelivery] = useState(false);
	const [postDescription, setpostDescription] = useState("");

	const [successMessage, setSuccessMessage] = useState(null);

	async function handleSubmit(event) {
		event.preventDefault();
		let postData = {
			title: postTitle,
			price: postPrice,
			location: postLocation,
			willDeliver: postDelivery,
			description: postDescription,
		};
		console.log("postData", postData);

		try {
			const response = await fetch(`${API_URL}/posts`, {
				method: "POST",
				body: JSON.stringify(postData),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
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
					label="Location"
					value={postLocation}
					onChange={(e) => setpostLocation(e.target.value)}
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
