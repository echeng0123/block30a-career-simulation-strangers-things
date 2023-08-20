export default function DeletePost() {
	const tokenKey =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyMjgxYmJlYjkzNTAwMTRjNGNiMzAiLCJ1c2VybmFtZSI6ImNhciIsImlhdCI6MTY5MjU0MzAwM30.QajAa_4KC8k0RXbXZpqGG0NK3ElkU8MDWIS6aIbSmsM";

	async function handleDelete() {
		try {
			const result = await deletePost(post._id);
			console.log("result from delete", result);
			navigate("/posts");
		} catch (error) {
			console.error("can't delete post", error);
		}
	}

	return <button>Delete Post</button>;
}
