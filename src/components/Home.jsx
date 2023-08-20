import SignUpForm from "./SignUpForm";

export default function Home() {
	function CallBack(token) {
		return (
			<div>
				<p>token from sign up form: {token}</p>
			</div>
		);
	}

	return (
		<div>
			<h1>parent to child</h1>
			<br />
			<SignUpForm handleCallback={CallBack} />
		</div>
	);
}
