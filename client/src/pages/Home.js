import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const Home = () => {
	const { user } = useAuthContext();

	return (
		<>
			{!user && (
				<section className='home'>
					<div className='home-container-intro'>
						<div className='home-title'>
							<h1>Welcome to the Financial Forge</h1>
						</div>
						<div className='home-welcome'>
							<p>Personal Project for managing income and expenses.</p>
							<p>
								To get started <a href='/login'>login</a> with an existing user or{" "}
								<a href='/signup'>sign up</a> with a new email.
							</p>
						</div>
						<div className='home-nav'>
							<Nav>
								<Nav.Item>
									<Nav.Link as={Link} to='/login'>
										Login
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link as={Link} to='/signup'>
										Sign up
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</div>
					</div>
				</section>
			)}
			{user && (
				<section className='home'>
					<div className='home-container-intro'>
						<div className='home-welcome'>
							<h1>Welcome to the Forge, {user.name}!</h1>
							<p>Access your income, expenses, and summary</p>
						</div>
						<div className='home-nav'>
							<Nav>
								<Nav.Item>
									<Nav.Link as={Link} to='/income'>
										Income
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link as={Link} to='/expense'>
										Expense
									</Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link as={Link} to='/summary'>
										Summary
									</Nav.Link>
								</Nav.Item>
							</Nav>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default Home;
