//  this component handles the deleting of a post

import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost } from "../API/STindex";

export default function DeletePost(postId) {
	const postIdDP = postId.postId;

	const navigate = useNavigate();

	// access current state from redux store
	const tokenDP = useSelector((state) => state.user.token);

	async function handleDelete(event) {
		console.log("entering handleDelete in DP");
		event.preventDefault();

		try {
			const result = await deletePost(postIdDP, tokenDP);
			console.log("result from handle delete", result);
			navigate("/posts");
		} catch (error) {
			console.error(error);
		}
	}
	return (
		<div>
			<button onClick={handleDelete}>Delete Post</button>
		</div>
	);
}
