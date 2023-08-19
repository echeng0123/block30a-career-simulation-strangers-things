// This function allows the user to log into the site and verifies the input. It also checks the state of being logged in to redirect the user to the correct places.

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik"; // handles form validation & formatting
import * as Yup from "yup"; // helps with runtime value parsing and validation

import { login } from "./slices/authSlice";
import { clearMessage } from "./slices/messageSlice";

export default function Login() {
	let navigate = useNavigate();

	const [loading, setLoading] = useState(false);

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(clearMessage());
	}, [dispatch]);

	const initialValues = {
		username: "",
		password: "",
	};

	const validationSchema = Yup.object().shape({
		username: Yup.string().required("This field is required."),
		password: Yup.string().required("This field is required."),
	});

	function handleLogin(formValue) {
		const { username, password } = formValue;
		setLoading(true);

		dispatch(login({ username, password }))
			.unwrap()
			.then(() => {
				navigate("/profile");
				window.location.reload();
			})
			.catch(() => {
				setLoading(false);
			});
	}

	if (isLoggedIn) {
		return <Navigate to="/profile" />;
	}

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleLogin}
			>
				<Form>
					<div>
						<label htmlFor="username">Username</label>
						<Field name="username" type="text" />
						<ErrorMessage name="username" component="div" />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<Field name="password" type="password" />
						<ErrorMessage name="password" component="div" />
					</div>
					<div>
						<button type="submit" disabled={loading}>
							{loading && <span></span>}
							<span>Login</span>
						</button>
					</div>
				</Form>
			</Formik>

			{message && <div>{message}</div>}
		</div>
	);
}
