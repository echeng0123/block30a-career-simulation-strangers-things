// This component allows a user to log in and verifies if they have logged in successfully

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

export default async function Login({ username, password }) {
	try {
		const response = await fetch(`${API_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user: {
					username: username,
					password: password,
				},
			}),
		});
		const result = await response.json();
		console.log("result from Login ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
}
