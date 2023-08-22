/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import { useLocation } from "react-router-dom";

describe("App component", () => {
	const location = useLocation();

	test("displays the homepage on load", () => {
		// Render the App component
		render(<App />);

		// check that the homepage loads the sign in box
		const usernameName = screen.getByText("username");
		expect(usernameName).toBeInTheDocument();

		// check that you can navigate to the posts page
		// Find the page "Posts" in navbar
		const postsName = screen.getByText("Posts");

		// Simulate a click on the posts
		fireEvent.click(postsName);
		expect(location).toBe("/posts");

		// Check that the create new post page is NOT there for guest visitors
		const createNewPost = screen.getByText("Submit");
		expect(createNewPost).not.toBeInTheDocument();
	});
});
