import React from 'react';
import { useSpring, animated } from 'react-spring';
import { navigate } from '@reach/router';
import transfer from '../images/transfer.svg';
import styled from 'styled-components';
import '../component/Landingpage.css';
const Img = styled.img`
  height: 100%;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
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
      <LeftBlock>
        <TitleBlock>
          <p>The Quickest and Simplest Place for Loans</p>
          <p className='appTitle'>FriendLend</p>
        </TitleBlock>
        <InfoBlock>
          <p className='appTitle'>Receive Money</p>
          <p>
            {' '}
            Wether getting a loan repaid or receiving money from a friend,
            FriendLend makes getting your money easy.
          </p>
        </InfoBlock>
        <InfoBlock>
          <p className='appTitle'>Send Money</p>
          <p>
            Pay back a loan or send money to a friend in a few quick steps.{' '}
          </p>
        </InfoBlock>
        <InfoBlock>
          <p className='appTitle'>View & Manage Loans</p>
          <p>
            See all your active and pending loans in one simple and easy to
            understand location.
          </p>
        </InfoBlock>
        <Button onClick={() => navigate('/signup')}>Get Started</Button>
      </LeftBlock>
      <RightBlock>
        <Img src={transfer} alt='money transfer' />
      </RightBlock>
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
  padding: 5px;
  margin: 0 auto;
  margin-top: 2rem;
`;
const LeftBlock = styled.div`
  width: 55%;
  height: 100%;
  cursor: pointer;
`;
const RightBlock = styled.div`
  width: 45%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleBlock = styled.div`
  width: 100%;
  height: 25%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & > p {
    font-size: 30px;
    margin: 5px;
  }
  & > .appTitle {
    width: 40%;
    display: flex;
    justify-content: center;
    font-size: 40px;
    margin-left: 5px;
    color: #6c63fe;
    background: #f2f2f2;
    border-radius: 2px;
    font-weight: bold;
  }
`;

const InfoBlock = styled.div`
  width: 100%;
  height: 20%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  & > p {
    font-size: 20px;
    margin: 5px;
    padding: 5px;
  }
  & > .appTitle {
    display: flex;
    padding: 5px;
    justify-content: center;
    font-size: 30px;
    margin-left: 5px;
    color: black;
    background: #f2f2f2;
    border-radius: 2px;
    font-weight: bold;
  }
`;

const Button = styled.button`
  width: 50%;
  margin: 0 25%;
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

export default LandingPage;
