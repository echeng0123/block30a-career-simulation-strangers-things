import TextField from "@mui/material/TextField";
import { useState } from "react";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function NewPostForm() {
	const [postTitle, setpostTitle] = useState("");
	const [postPrice, setpostPrice] = useState("");
	const [postLocation, setpostLocation] = useState("");
	const [postDelivery, setpostDelivery] = useState(false);
	const [postDescription, setpostDescription] = useState(false);

	const [successMessage, setSuccessMessage] = useState(null);

	async function handleSubmit(event) {
		event.preventDefault();
		let postData = {
			title: postTitle,
			price: postPrice,
			location: postLocation,
			imageUrl: postImage,
		};
		console.log("postData", postData);

		try {
			const response = await fetch(`${API_URL}/posts`, {
				method: "POST",
				body: JSON.stringify(postData),
				headers: { "Content-Type": "application/json" },
			});
			console.log("response: ", response);
			const result = await response.json();
			console.log("result", result);
			setSuccessMessage("Sign up successful");
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
					value={postName}
					onChange={(e) => setpostName(e.target.value)}
				/>
				<TextField
					label="Breed"
					value={postBreed}
					onChange={(e) => setpostBreed(e.target.value)}
				/>
				<TextField
					label="Image Url"
					value={postImage}
					onChange={(e) => setpostImage(e.target.value)}
				/>
				<input
					type="radio"
					id="bench"
					name="status"
					value={postStatus}
					onChange={() => setpostStatus("bench")}
					label="On Bench"
				></input>
				<label htmlFor="bench">On Bench</label>
				<input
					type="radio"
					id="field"
					name="status"
					value={postStatus}
					onChange={() => setpostStatus("field")}
					label="On Field"
				></input>
				<label htmlFor="field">On Field</label>
				<button type="submit">Submit</button>
			</form>
		</>
	);
}
