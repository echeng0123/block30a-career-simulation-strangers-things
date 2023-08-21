const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

// hardcoding a token in
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUyMjgxYmJlYjkzNTAwMTRjNGNiMzAiLCJ1c2VybmFtZSI6ImNhciIsImlhdCI6MTY5MjU0MzAwM30.QajAa_4KC8k0RXbXZpqGG0NK3ElkU8MDWIS6aIbSmsM";

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

export const fetchUserProfile = async () => {
	try {
		const response = await fetch(`${API_URL}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		console.log("result is", result);
		if (result.success) {
			console.log(`User ${result.data.username} is here`);
		} else {
			alert("can't get user profile");
			console.log(result.message);
		}
		return result;
	} catch (error) {
		console.error(error.message);
	}
};

// export async function deletePost(id) {
// 	try {
// 		const response = await fetch(`${API_URL}/posts/${id}`, {
// 			method: "DELETE",
// 		});
// 		const result = await response.json();
// 		return result;
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
