//  this component handles the expanding of a message

import { useState } from "react";
import SingleMessage from "./SingleMessage";

export default function ExpandMessage({
	messageId,
	messageTitle,
	messageContent,
	userMessages,
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [messageIdEM, setMessageIdEM] = useState(messageId);
	const [messageTitleEM, setMessageTitleEM] = useState(messageTitle);
	const [messageContentEM, setMessageContentEM] = useState(messageContent);
	const [userMessagesEM, setUserMessagesEM] = useState(userMessages);

	function handleClick() {
		setIsOpen(!isOpen);
	}
	return (
		<div>
			<button id="clickable-message-button" onClick={handleClick}>
				{" "}
				<div id="each-message">
					<h3>Re: Post: {messageTitle}</h3>
				</div>
				{isOpen && (
					<SingleMessage
						messageIdEM={messageIdEM}
						messageTitleEM={messageTitleEM}
						messageContentEM={messageContentEM}
						userMessagesEM={userMessagesEM}
					/>
				)}
			</button>
		</div>
	);
}
