// This function is a service for accessing data (screening & routing pages that require authorized users to be logged in)

import axios from "axios";
import authHeader from "./auth-header";

const cohortName = "2306-GHP-ET-WEB-FT-SF";
const API_URL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

function getPublicContent() {
	return axios.get(`${API_URL}/posts`, { headers: authHeader() });
}

function getUserProfile() {
	return axios.get(`${API_URL}/users/me`, { headers: authHeader() });
}

function getMessages() {
	return axios.get(
		`${API_URL}/posts/POST_ID/messages, {headers: authHeader()}`
	);
}

const userService = {
	getPublicContent,
	getUserProfile,
	getMessages,
};

export default userService;
