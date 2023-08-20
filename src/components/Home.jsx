// This component is the home page/landing page for the site. The landing for the page conditionally renders text depending on whether or not a user is logged in.

import SignUpForm from "./SignUpForm";
import { useState } from "react";

export default function Home() {
	const [token, setToken] = useState(null);
	return <SignUpForm token={token} setToken={setToken} />;
}
