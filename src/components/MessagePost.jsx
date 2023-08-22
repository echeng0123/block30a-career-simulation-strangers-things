// this component handles the button for sending a message

import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { messageSeller } from "../API/STindex";

export default function MessagePost(postId) {
	const [isOpen, setIsOpen] = useState(false);
	const [messageContent, setMessageContent] = useState("");

	const navigate = useNavigate();
	const location = useLocation();

	const postIdMP = postId.postId;

	// access current state from redux store
	const tokenF = useSelector((state) => state.user.token);

	function handleClick() {
		setIsOpen(!isOpen);
	}

	async function handleMessage(event) {
		event.preventDefault();

		let postObj = JSON.stringify({
			message: {
				content: messageContent,
			},
		});

		try {
			messageSeller(postObj, postIdMP, tokenF);
			setIsOpen(!isOpen); // close message button
			alert("Message sent to seller.");
			if (location.pathname === "/profile") {
				navigate("/posts"); // can't simulate refresh or will end session but if a user now clicks back to /profile they will see the updated messages
			} else if (location.pathname == "/posts") {
				navigate("/profile");
			}
		} catch (err) {
			console.error("can't send message", err);
		}
	}

	return (
		<div>
			<button onClick={handleClick}>Message Seller</button>
			{isOpen && (
				<div>
					<form
						onSubmit={(event) => handleMessage(event)}
						id="message-form-container"
					>
						<TextField
							label="Name"
							value={messageContent}
							onChange={(e) => setMessageContent(e.target.value)}
						/>
						<button type="submit">Send Message</button>
					</form>
				</div>
			)}
		</div>
	);
}
