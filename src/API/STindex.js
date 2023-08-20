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

// export const fetchSinglePost = async (postId) => {
// 	try {
// 		const response = await fetch(`${API_URL}/posts/${postId}`);
// 		const post = await response.json();
// 		// const singlePost = post.data.player;
// 		return post;
// 	} catch (error) {
// 		console.error("Can't fetch post", error);
// 	}
// };

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

export async function createPost(
	title,
	description,
	price,
	location,
	willDeliver
) {
	try {
		const response = await fetch(`${API_URL}/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
				price,
				location,
				willDeliver,
			}),
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}
