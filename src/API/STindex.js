const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const fetchAllPosts = async () => {
	try {
		const response = await fetch(`${API_URL}/posts`);
		const posts = await response.json();
		const allPosts = posts.data.posts;
		return allPosts;
	} catch (error) {
		console.error("Cannot fetch all players", error);
	}
};
