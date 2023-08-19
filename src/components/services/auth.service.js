// This file handles the verification/authentication of user account tokens. Will be called in other components that require authentication to work.

import axios from "axios";
const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

function register(username, password) {
	return axios.post(`${API_URL}/users/register`, {
		username,
		password,
	});
}

function login(username, password) {
	return axios
		.post(`${API_URL}/users/login`, {
			username,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}

			console.log("login response data", response.data);
			return response.data;
		});
}

function logout() {
	localStorage.removeItem("user");
}

const authService = {
	register,
	login,
	logout,
};

export default authService;
