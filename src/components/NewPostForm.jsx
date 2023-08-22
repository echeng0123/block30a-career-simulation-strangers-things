import { TextField, InputLabel, Select, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllPosts } from "../API/STindex";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default function NewPostForm() {
	const [postTitle, setpostTitle] = useState("");
	const [postPrice, setpostPrice] = useState("");
	const [postLocation, setpostLocation] = useState("");
	const [postDelivery, setpostDelivery] = useState(false);
	const [postDescription, setpostDescription] = useState("");

	const [successMessage, setSuccessMessage] = useState(null);

	const navigate = useNavigate();

	// access current state from redux store
	const tokenC = useSelector((state) => state.user.token);

	const handleChange = (event) => {
		setpostDelivery(event.target.value);
	};

	async function handleSubmit(event) {
		event.preventDefault();
		let postData = {
			post: {
				title: postTitle,
				price: postPrice,
				location: postLocation,
				willDeliver: postDelivery,
				description: postDescription,
			},
		};

		try {
			const response = await fetch(`${API_URL}/posts`, {
				method: "POST",
				body: JSON.stringify(postData),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenC}`,
				},
			});
			console.log("response from NPF: ", response);
			const result = await response.json();
			console.log("result from NPF: ", result);
			setSuccessMessage("Post submitted");
			fetchAllPosts();
			navigate("/profile");
		} catch (err) {
			console.error("Oops, something went wrong with adding that post!", err);
		}
	}

	return (
		<>
			{successMessage && <p>{successMessage}</p>}
			<h2 id="new-post-header">Create a New Post</h2>
			<form onSubmit={handleSubmit} id="new-post-form-container">
				<TextField
					id="NP-input-box"
					label="Name"
					value={postTitle}
					onChange={(e) => setpostTitle(e.target.value)}
				/>
				<TextField
					id="NP-input-box"
					label="Price"
					value={postPrice}
					onChange={(e) => setpostPrice(e.target.value)}
				/>
				<TextField
					id="NP-input-box"
					label="Location"
					value={postLocation}
					onChange={(e) => setpostLocation(e.target.value)}
				/>
				<InputLabel id="NP-delivery-label">Delivery Available?</InputLabel>
				<Select
					labelId="simple-select-label"
					id="NP-input-box"
					value={postDelivery}
					label="delivery"
					onChange={handleChange}
				>
					<MenuItem value={false}>No</MenuItem>
					<MenuItem value={true}>Yes</MenuItem>
				</Select>
				<TextField
					id="NP-input-box"
					label="Description"
					value={postDescription}
					onChange={(e) => setpostDescription(e.target.value)}
				/>
				<button type="submit" id="np-button">
					Submit
				</button>
			</form>
		</>
	);
}
