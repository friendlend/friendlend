import React from 'react';
// import { useSpring, animated } from 'react-spring';
import { Link } from '@reach/router';
import transfer from '../assets/images/transfer.svg';
import pay from '../assets/videos/pay.mp4';
import styled from 'styled-components';
import '../component/Landingpage.css';
const Img = styled.img`
  height: 100%;
  width: 80%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const LandingPage = ({ navigate }) => {
  // const fade = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 600 });
  // const fade2 = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 1050 });
  return (
    <Container>
      <NavWrapper>
        {/* <button onClick={() => navigate('/signup')}>Request Money</button>
				<p>or</p>
        <button onClick={() => navigate('/login')}>Log In</button> */}
        {/* <Button onClick={() => navigate('/signup')}>Get Started</Button> */}
        <NavLink to='/signup'>Sign Up</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/login'>Sign In</NavLink>
      </NavWrapper>
      <Jumbo>
        <video src={pay} autoPlay muted loop playsInline></video>
        <div>
          <h1>friendlend</h1>
          <h2>The easiest way to borrow money from friends and family!</h2>
          <button onClick={() => navigate('/signup')}>Start a Loan Now</button>
        </div>
      </Jumbo>
      {/* <animated.div style={fade}>
        <H1>Welcome to Friend Lend!</H1>
      </animated.div>

       <Img src={transfer} alt='money transfer' />
      <Div style={fade2}>
        <Card>
      <h4>Send Money</h4>
    <Container>
      <animated.div style={fade}>
        <H1>Welcome to Friend Lend!</H1>
      </animated.div>

      <Img src={transfer} alt='money transfer' />
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
      </Div> */}
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
    </Container>
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

const Jumbo = styled.div`
  background: linear-gradient(135deg, #c9de96 0%, #8ab66b 44%, #398235 100%);
  width: 100%;
  position: relative;

  video {
    width: 100%;
    filter: grayscale(50%);
  }

  & > div {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      user-select: none;
      font-family: 'Permanent Marker', cursive;
      font-size: 10rem;
      color: white;
    }

    h2 {
      width: 50%;
      color: white;
      font-size: 4rem;
      text-align: center;
      margin: 50px;
    }

    button {
      background: rgba(0, 0, 0, 0);
      font-size: 3rem;
      color: white;
      border: 2px solid white;
      border-radius: 5px;
      padding: 10px 15px;
      cursor: pointer;
      transition: all 200ms linear;
      &:hover {
        background: white;
        color: black;
      }
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  transition: all 200ms linear;
  &:hover {
    color: black;
  }
`;

const NavWrapper = styled.nav`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 20%;
  padding: 20px 3%;
  z-index: 10;
  font-size: 2rem;
  color: white;
  justify-content: space-between;
  & > * {
    color: white;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default LandingPage;
