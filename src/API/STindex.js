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

export async function deletePost(postIdB, tokenB) {
	console.log("entering delete");

	try {
		const response = await fetch(`${API_URL}/posts/${postIdB}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenB}`,
			},
		});
		const result = await response.json();
		console.log("result from delete", result);
		return result;
	} catch (error) {
		console.error(error);
	}
}

export async function editPost(
	newTitle,
	newDescription,
	newPrice,
	newLocation,
	newDelivery,
	postIdAP,
	tokenA
) {
	console.log("entering edit post");

	try {
		const response = await fetch(`${API_URL}/posts/${postIdAP}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenA}`,
			},
			body: {
				post: {
					title: newTitle,
					description: newDescription,
					price: newPrice,
					location: newLocation,
					willDeliver: newDelivery,
				},
			},
		});
		const result = await response.json();
		console.log("result from edit", result);
		return result;
	} catch (error) {
		console.error(error);
	}
}

export async function handleEdit(
	event,
	newTitle,
	newDescription,
	newPrice,
	newLocation,
	newDelivery,
	postIdAP,
	tokenA
) {
	console.log("entering handleEdit in edit post");
	event.preventDefault();

	try {
		const result = await editPost(
			newTitle,
			newDescription,
			newPrice,
			newLocation,
			newDelivery,
			postIdAP,
			tokenA
		);
		console.log(result);
		// navigate("/posts");
	} catch (error) {
		console.error(error);
	}
}
