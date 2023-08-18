// This component handles the behavior of the see details button for the post page

import { useState } from "react";
import SinglePost from "./SinglePost";

export default function SeePostDetails({ selectedPostId, setSelectedPostId }) {
	const [isOpen, setIsOpen] = useState(false);

	function handleClick() {
		setIsOpen(!isOpen);
	}

	return (
		<div>
			<button onClick={handleClick}>See Details</button>
			{isOpen && (
				<SinglePost
					selectedPostId={selectedPostId}
					setSelectedPostId={setSelectedPostId}
				/>
			)}
		</div>
	);
}
