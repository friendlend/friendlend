import React from 'react';
import styled from 'styled-components';
const Container = styled.div`
	display: grid;
	grid-template-areas:
		'sidebar-1 content sidebar-2'
		'sidebar-1 content sidebar-2';
	grid-gap: 15px;
	grid-template-columns: 200px 1fr 200px;
	grid-template-rows: 100px 400px 0 150px;
	& > * {
		border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 5px;
		grid-gap: 10px;
	}
`;
const Section = styled.section`
	grid-area: content;
`;
const Aside = styled.aside`
	grid-area: sidebar-1;
`;
const Aside2 = styled.aside`
	grid-area: sidebar-2;
`;
const Dashboard = () => {
	return (
		<Container>
			<Aside>Sent</Aside>
			<Section>All the Info</Section>
			<Aside2>Received</Aside2>
		</Container>
	);
};

export default Dashboard;
