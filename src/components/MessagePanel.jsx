// This component renders full messages in a panel

import { fetchUserProfile } from "../API/STindex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MessagePanel() {
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
				<div>
					<label>
						Search your sent messages:{" "}
						<input
							id="search-messages"
							type="text"
							placeholder="Search title or description"
							onChange={(event) =>
								setSearchMessageParam(event.target.value.toLowerCase())
							}
						/>
					</label>
				</div>
				<div>
					{error && <p>{error}</p>}
					{userMessagesToDisplay.map((message) => {
						const messageTitle = message.post.title;
						const messageContent = message.content;

						return (
							<>
								<div id="each-message">
									<h3>Re: Post: {messageTitle}</h3>
									<p id="message-description">{messageContent}</p>
								</div>
							</>
						);
					})}
				</div>
			</div>
		</>
	);
}
