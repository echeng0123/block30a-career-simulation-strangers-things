import SignUpForm from "./SignUpForm";
import Login from "./Login";

export default function Home() {
	return (
		<div>
			<h1 id="home-header">Welcome</h1>
			<br />
			<div>
				<SignUpForm />
			</div>
			<br />
			<div>
				<Login />
			</div>
		</div>
	);
}
