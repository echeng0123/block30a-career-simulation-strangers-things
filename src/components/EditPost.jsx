// this component handles the editing of a post

import { useState } from "react";
import { useSelector } from "react-redux";
import { editPost } from "../API/STindex";
import { TextField } from "@mui/material";

export default function EditPost(postIdAP) {
	console.log("you've entered Edit Post component");

	const [isOpen, setIsOpen] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newPrice, setNewPrice] = useState("");
	const [newLocation, setNewLocation] = useState("");
	const [newDelivery, setNewDelivery] = useState(false);
	const [postIdEP, setPostIdEP] = useState(postIdAP);

	// access current state from redux store
	const userA = useSelector((state) => state.user.user);
	const tokenA = useSelector((state) => state.user.token);

	function handleClick() {
		setIsOpen(!isOpen);
	}

	async function handleEdit(event, postIdEP) {
		console.log("entering handle edit click");
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

		console.log("postObj", postObj);

		try {
			editPost(postObj, postIdEP, tokenA);
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
						<TextField
							label="Delivery Available"
							value={newDelivery}
							onChange={(e) => setNewDelivery(e.target.value)}
						/>
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
