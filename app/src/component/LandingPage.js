import React from 'react';
import { useSpring, animated } from 'react-spring';
import { navigate } from '@reach/router';
import transfer from '../images/transfer.svg';
import styled from 'styled-components';
const Img = styled.img`
	width: 250px;
	height: 300px;
	width: 100%;
	margin-top: 20px;
	margin-bottom: 20px;
`;

const LandingPage = () => {
	const fade = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 600 });
	const fade2 = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 1050 });
	return (
		<Container>
			<NavWrapper>
				{/* <button onClick={() => navigate('/signup')}>Request Money</button>
				<p>or</p>
        <button onClick={() => navigate('/login')}>Log In</button> */}
				<Button onClick={() => navigate('/signup')}>Get Started</Button>
			</NavWrapper>
			<animated.div style={fade}>
				<H1>Welcome to Friend Lend!</H1>
			</animated.div>

			<Img src={transfer} alt="money transfer" />
			<Div style={fade2}>
				<Card>
					<h4>Send Money</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nisi
						ipsam facilis provident neque deserunt! Numquam ipsam fugit ipsa
						repellat eveniet, enim nisi illo non, quia accusantium accusamus!
						Saepe, impedit!
					</p>
				</Card>
				<Card>
					<h4>Receive Money</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nisi
						ipsam facilis provident neque deserunt! Numquam ipsam fugit ipsa
						repellat eveniet, enim nisi illo non, quia accusantium accusamus!
						Saepe, impedit!
					</p>
				</Card>
				<Card>
					<h4>View & Manage</h4>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nisi
						ipsam facilis provident neque deserunt! Numquam ipsam fugit ipsa
						repellat eveniet, enim nisi illo non, quia accusantium accusamus!
						Saepe, impedit!
					</p>
				</Card>
			</Div>
		</Container>
	);
};
const Card = styled.div`
	margin-top: 10px;
	h4 {
		text-align: center;
		margin-bottom: 10px;
		font-size: 1.4rem;
	}
	width: 26%;
	display: flex;
	flex-direction: column;
	p {
		line-height: 1.5;
	}
`;
const Button = styled.button`
	width: 125px;
	height: 42px;
	cursor: pointer;
	border-radius: 5px;
	font-size: 18px;
	padding: 8px;
	color: white;
	background-color: #4f455e;
	&:hover {
		opacity: 0.7;
	}
`;
const P = styled.p`
	width: 40%;
`;
const Div = styled(animated.div)`
	display: flex;
	margin: 0 auto;
	margin-top: 40px;
	width: 90%;
	justify-content: space-evenly;
`;
const H1 = styled.h1`
	text-align: center;
	margin-top: 10px;
	font-size: 4rem;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
		Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
export default LandingPage;
const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
const NavWrapper = styled.nav`
	display: flex;
	position: sticky;
	justify-content: flex-end;
	padding: 2em 1.5em;
	background-color: #333333;
	& > * {
		color: white;
	}
`;
