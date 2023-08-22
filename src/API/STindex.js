const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export const fetchAllPosts = async () => {
	try {
		const response = await fetch(`${API_URL}/posts`);
		const posts = await response.json();
		return posts;
	} catch (error) {
		console.error("Cannot fetch all players", error);
	}
};

export const fetchUserProfile = async (token) => {
	try {
		const response = await fetch(`${API_URL}/users/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		if (result.success) {
			console.log(`User ${result.data.username} has logged in`);
		} else {
			console.log("can't get user profile");
		}
		return result;
	} catch (error) {
		console.error(error.message);
	}
};

export async function deletePost(postIdDP, tokenD) {
	try {
		const response = await fetch(`${API_URL}/posts/${postIdDP}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenD}`,
			},
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
}

export async function editPost(postObj, postIdEP, tokenA) {
	try {
		const response = await fetch(`${API_URL}/posts/${postIdEP}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenA}`,
			},
			body: postObj,
		});
		const result = await response.json();
		alert("Successfully edited post.");
		return result;
	} catch (error) {
		alert("Can't edit post, please login again.");
		console.error(error);
	}
}

export async function messageSeller(postObj, postIdMP, tokenF) {
	try {
		const response = await fetch(`${API_URL}/posts/${postIdMP}/messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenF}`,
			},
			body: postObj,
		});
		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Can't message seller", error);
	}
}
