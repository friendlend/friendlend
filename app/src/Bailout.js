import React from 'react';
import { navigate } from '@reach/router';
import styled from 'styled-components';
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
`;
const fakeRequest = {
	person: 'Austen Allred',
	amount: '$30,000',
	description: 'I need $30,000 to pay off my ISA!',
	payback_date: '4/29/2021',
};
const Bailout = () => {
	return (
		<Container>
			<P>
				{fakeRequest.person} needs{' '}
				<strong>
					{fakeRequest.amount} which they can pay back on{' '}
					{fakeRequest.payback_date}
				</strong>
			</P>
			<Button onClick={() => navigate('/cardform')}>Bail them out?</Button>
		</Container>
	);
};
const P = styled.p`
	font-size: 1.6rem;
`;
const Button = styled.button`
	width: 160px;
	height: 53px;
	cursor: pointer;
	border-radius: 5px;
	font-size: 17px;
	padding: 8px;
	color: white;
	background-color: #4f455e;
	margin-top: 20px;
	&:hover {
		opacity: 0.7;
	}
`;
export default Bailout;
