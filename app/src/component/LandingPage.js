import React from 'react';
import { useSpring, animated } from 'react-spring';
import { navigate } from '@reach/router';
import transfer from '../images/transfer.svg';
import styled from 'styled-components';
import '../component/Landingpage.css';
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
    // <Container>
    //   <animated.div style={fade}>
    //     <H1>Welcome to Friend Lend!</H1>
    //   </animated.div>

    //   <Img src={transfer} alt='money transfer' />
    //   <Div style={fade2}>
    //     <Card>
    //       <h4>Send Money</h4>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nisi
    //         ipsam facilis provident neque deserunt! Numquam ipsam fugit ipsa
    //         repellat eveniet, enim nisi illo non, quia accusantium accusamus!
    //         Saepe, impedit!
    //       </p>
    //     </Card>
    //     <Card>
    //       <h4>Receive Money</h4>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nisi
    //         ipsam facilis provident neque deserunt! Numquam ipsam fugit ipsa
    //         repellat eveniet, enim nisi illo non, quia accusantium accusamus!
    //         Saepe, impedit!
    //       </p>
    //     </Card>
    //     <Card>
    //       <h4>View & Manage</h4>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae nisi
    //         ipsam facilis provident neque deserunt! Numquam ipsam fugit ipsa
    //         repellat eveniet, enim nisi illo non, quia accusantium accusamus!
    //         Saepe, impedit!
    //       </p>
    //     </Card>
    //   </Div>
    // </Container>
    <Package>
      <LeftBlock>L</LeftBlock>
      <RightBlock>R</RightBlock>
    </Package>
  );
};
const Package = styled.div`
  transition: box-shadow 0.3s;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.5s;
  display: flex;
  width: 100%;
  max-width: 1220px;
  height: 85%;
  padding: 10px;
  margin: 0 auto;
  margin-top: 2rem;
`;
const LeftBlock = styled.div`
  width: 50%;
  height: 100%;
  cursor: pointer;
  padding: 5px;
`;
const RightBlock = styled.div`
  width: 50%;
  height: 100%;
  cursor: pointer;
  padding: 5px;
`;

export default LandingPage;
