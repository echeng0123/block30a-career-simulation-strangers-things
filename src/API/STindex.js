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
