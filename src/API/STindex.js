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

export async function editPost(postObj, postIdEP, tokenA) {
	console.log("entering edit post");
	console.log("postObj inside EP: ", postObj);
	console.log("postIdEP inside EP: ", postIdEP);
	console.log("tokenA inside EP: ", tokenA);

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
		console.log("result from edit post", result);
		return result;
	} catch (error) {
		console.error(error);
	}
}

// export async function handleEditClick(
// 	event,
// 	newTitle,
// 	newDescription,
// 	newPrice,
// 	newLocation,
// 	newDelivery,
// 	postIdAP,
// 	tokenA
// ) {
// 	console.log("entering handleEdit in edit post");

// 	try {
// 		const result = await editPost(
// 			newTitle,
// 			newDescription,
// 			newPrice,
// 			newLocation,
// 			newDelivery,
// 			postIdAP,
// 			tokenA
// 		);
// 		console.log(result);
// 	} catch (error) {
// 		console.error(error);
// 	}
// }
