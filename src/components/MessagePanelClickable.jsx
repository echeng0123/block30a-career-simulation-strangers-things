// This component renders full messages in a panel clickable for "email inbox" functionality in the Messages page.

// This component renders full messages in a panel

// This component renders the logged in user profile.
import { fetchUserProfile } from "../API/STindex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ExpandMessage from "./ExpandMessage";

export default function MessagePanelClickable() {
	const [userMessages, setUserMessages] = useState([]);
	const [error, setError] = useState(null);
	const [searchMessageParam, setSearchMessageParam] = useState("");

	const navigate = useNavigate();

	// access current state from redux store
	const tokenA = useSelector((state) => state.user.token);

	useEffect(() => {
		async function getUserMessages() {
			const response = await fetchUserProfile(tokenA);
			if (response.success) {
				setUserMessages(response.data.messages);
			} else {
				setError(response.error);
				navigate("/login");
			}
		}
		getUserMessages();
	}, []);

	// render all messages
	const userMessagesToDisplay = searchMessageParam
		? userMessages.filter(
				(message) =>
					message.post.title.toLowerCase().includes(searchMessageParam) ||
					message.content.toLowerCase().includes(searchMessageParam)
		  )
		: userMessages;

	return (
		<>
			<div id="messages-panel">
				<div id="your-posts-header">
					<h2>Sent Messages: </h2>
				</div>
				<div id="search-posts">
					<label>
						Search your sent messages:{" "}
						<input
							id="search-posts-bar"
							type="text"
							placeholder="Search title or description"
							onChange={(event) =>
								setSearchMessageParam(event.target.value.toLowerCase())
							}
						/>
					</label>
				</div>
				<div>
					<h4>Click messages for more details.</h4>
				</div>
				<div id="clickable-messages">
					{error && <p>{error}</p>}
					{userMessagesToDisplay.map((message) => {
						const messageTitle = message.post.title;
						const messageContent = message.content;
						const messageId = message._id;

						return (
							<>
								<ExpandMessage
									messageId={messageId}
									messageTitle={messageTitle}
									messageContent={messageContent}
									userMessages={userMessages}
								/>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
