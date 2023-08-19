// This component handles form validation for user registration. It dispatches the register action and shows a response message.

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik"; // handles form validation & formatting
import * as Yup from "yup"; // helps with runtime value parsing and validation

import { register } from "./slices/authSlice";
import { clearMessage } from "./slices/messageSlice";

export default function Register() {
	const [successful, setSuccessful] = useState(false);

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
		username: Yup.string()
			.test(
				"len",
				"The username must be at least 3 characters long.",
				(val) => val && val.toString().length >= 3
			)
			.required("This field is required."),
		password: Yup.string()
			.test(
				"len",
				"The password must be at least 3 characters long.",
				(val) => val && val.toString().length >= 3
			)
			.required("This field is required."),
	});

	const handleRegister = (formValue) => {
		const { username, password } = formValue;

		setSuccessful(false);

		dispatch(register({ username, password }))
			.unwrap()
			.then(() => {
				setSuccessful(true);
			})
			.catch(() => {
				setSuccessful(false);
			});
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleRegister}
			>
				<Form>
					{!successful && (
						<div>
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
								<button type="submit">Create Account</button>
							</div>
						</div>
					)}
				</Form>
			</Formik>
			{message && (
				<div className="form-group">
					<div
						className={
							successful ? "alert alert-success" : "alert alert-danger"
						}
						role="alert"
					>
						{message}
					</div>
				</div>
			)}
		</div>
	);
}
