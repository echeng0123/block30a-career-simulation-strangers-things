// This component renders a single message.

import { useState } from "react";

export default function SingleMessage({ messageIdEM, userMessagesEM }) {
	// access current state from redux store
	// const tokenA = useSelector((state) => state.user.token);
	const [filterMessages, setFilterMessages] = useState(userMessagesEM);

	const messageIdSM = messageIdEM;

	// expands only the selected message (originally this was going to be a separate message panel on the left but I ran out of time)
	const singleMessageDisplay = messageIdSM ? (
		filterMessages.filter((message) => message._id == messageIdSM)
	) : (
		<div>No message selected</div>
	);

	return (
		<div id="single-message-pane">
			{singleMessageDisplay.map((message) => {
				const messageContent = message.content;
				return (
					<>
						<div>
							<p id="message-description">Message: {messageContent}</p>
						</div>
					</>
				);
			})}
		</div>
	);
}
