const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const fetchAllPosts = async () => {
	try {
		const response = await fetch(`${API_URL}/posts`);
		const posts = await response.json();
		// const allPosts = posts.data.posts;
		return posts;
	} catch (error) {
		console.error("Cannot fetch all players", error);
	}
};

const tokenKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyMjgxYmJlYjkzNTAwMTRjNGNiMzAiLCJ1c2VybmFtZSI6ImNhciIsImlhdCI6MTY5MjU0MzAwM30.QajAa_4KC8k0RXbXZpqGG0NK3ElkU8MDWIS6aIbSmsM";

export async function deletePost(_id) {
	try {
		const response = await fetch(`${API_URL}/posts/${_id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenKey}`,
			},
		});
		const result = await response.json();
		console.log("I'm result from deletePost", result);
		return result;
	} catch (error) {
		console.error("i'm from deletePost", error);
	}
}
