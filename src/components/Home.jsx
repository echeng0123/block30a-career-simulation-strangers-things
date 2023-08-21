import SignUpForm from "./SignUpForm";
import Login from "./Login";

export default function Home({ token, setToken }) {
	return (
		<div>
			<h1>homepage here</h1>
			<h2>login here</h2>
			<Login token={token} setToken={setToken} />
			<h2>sign in here</h2>
			<SignUpForm token={token} setToken={setToken} />
		</div>
	);
}
