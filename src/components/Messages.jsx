// This component renders the Messages page, which includes a messages panel (with all messages) and a see message detail panel. Similar to an email inbox.

import MessagePanelClickable from "./MessagePanelClickable";

export default function Messages() {
	return (
		<div id="message-inbox">
			<MessagePanelClickable />
		</div>
	);
}
