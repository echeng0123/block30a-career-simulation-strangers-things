// This function checks Local Storage for the user item. If there exists a logged in user with accessToken, then return the HTTP authorization header, otherwise return an empty object.

export default function authHeader() {
	const user = JSON.parse(localStorage.getItem("user"));

	if (user && user.accessToken) {
		return { Authorization: "Bearer " + user.accessToken };
	} else {
		return {};
	}
}
