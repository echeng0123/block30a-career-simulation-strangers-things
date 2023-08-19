// This component is the home page/landing page for the site. Users do not need to be logged in to view this page.

import { useState, useEffect } from "react";

import userService from "./services/user.service.js";

export default function Home() {
	const [content, setContent] = useState("");

	useEffect(() => {
		userService.getPublicContent().then(
			(response) => {
				setContent(response.data);
			},
			(error) => {
				const _content =
					(error.response && error.response.data) ||
					error.message ||
					error.toString();

				setContent(_content);
			}
		);
	}, []);

	return (
		<>
			<div>{content}</div>
		</>
	);
}
