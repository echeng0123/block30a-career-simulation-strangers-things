// This component handles user logoff.

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
	// get current user status
	const navigate = useNavigate();
	useEffect(() => {
		navigate(0);
		navigate("/home");
	}, [navigate]);
}
