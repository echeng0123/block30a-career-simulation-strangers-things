import { useNavigate } from "react-router-dom";
import { deletePost } from "../API/STindex";

export default function DeletePost() {
	const navigate = useNavigate();

	async function handleDelete(userId) {
		try {
			const result = await deletePost(userId);
			console.log("result from handleDelete", result);
			navigate("/posts");
		} catch (error) {
			console.error("can't delete post", error);
		}
	}

	return <button onClick={handleDelete}>Delete Post</button>;
}
