// This component is the home page/landing page for the site. The landing for the page conditionally renders text depending on whether or not a user is logged in.
import { useState } from "react";
import SignUpForm from "./SignUpForm";

export default function Home() {
	const [token, setToken] = useState(null);

	return (
		<>
			<h1>this is home</h1>
			<SignUpForm token={token} setToken={setToken} />
		</>
	);
}
