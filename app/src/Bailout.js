import React from 'react';
import { navigate } from '@reach/router';
const fakeRequest = {
	person: 'Austen Allred',
	amount: '$30,000',
	description: 'I need $30,000 to pay off my ISA!',
	payback_date: '4/29/2021',
};
const Bailout = () => {
	return (
		<div>
			<h1>{fakeRequest.person} needs your support</h1>
			<p>
				{fakeRequest.person} needs{' '}
				<strong>
					{fakeRequest.amount} which they can pay back on{' '}
					{fakeRequest.payback_date}
				</strong>
			</p>
			<button onClick={() => navigate('/cardform')}>Bail them out?</button>
		</div>
	);
};

export default Bailout;
