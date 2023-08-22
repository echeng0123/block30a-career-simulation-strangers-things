// this component handles the editing of a post

import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPost } from "../API/STindex";
import { TextField, InputLabel, Select, MenuItem } from "@mui/material";

export default function EditPost(postId) {
	const [isOpen, setIsOpen] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newLocation, setNewLocation] = useState("");
	const [newDelivery, setNewDelivery] = useState(false);

	const navigate = useNavigate();

	const postIdEP = postId.postId;

	// access current state from redux store
	const tokenA = useSelector((state) => state.user.token);

	function handleClick() {
		setIsOpen(!isOpen);
	}

	const handleChange = (event) => {
		setNewDelivery(event.target.value);
	};

	async function handleEdit(event) {
		event.preventDefault();

		let postObj = JSON.stringify({
			post: {
				title: newTitle,
				description: newDescription,
				price: newPrice,
				location: newLocation,
				willDeliver: newDelivery,
			},
		});

		try {
			editPost(postObj, postIdEP, tokenA);
			navigate("/posts");
		} catch (err) {
			console.error("can't edit post", err);
		}
	}

	return (
		<div>
			<button onClick={handleClick}>Edit Post</button>
			{isOpen && (
				<div>
					<form
						onSubmit={(event) => handleEdit(event)}
						id="new-post-form-container"
					>
						<TextField
							label="Name"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
						/>
						<TextField
							label="Price"
							value={newPrice}
							onChange={(e) => setNewPrice(e.target.value)}
						/>
						<TextField
							label="Location"
							value={newLocation}
							onChange={(e) => setNewLocation(e.target.value)}
						/>
						<InputLabel id="simple-select-label">
							Delivery Available?
						</InputLabel>
						<Select
							labelId="simple-select-label"
							id="simple-select"
							value={newDelivery}
							label="delivery"
							onChange={handleChange}
						>
							<MenuItem value={false}>No</MenuItem>
							<MenuItem value={true}>Yes</MenuItem>
						</Select>
						<TextField
							label="Description"
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
						/>
						<button type="submit">Submit Updates</button>
					</form>
				</div>
			)}
		</div>
	);
}
