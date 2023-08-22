// This component handles user logoff.

import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { logout } from "../redux/authSlice";

export default function Logout() {
	// get current user status
	const navigate = useNavigate();
	useEffect(() => {
		navigate(0);
		navigate("/login");
	}, []);
}
