import React from 'react';
// import { useSpring, animated } from 'react-spring';
import { Link } from '@reach/router';
// import transfer from '../images/transfer.svg';
import pay from '../assets/videos/pay.mp4';
import styled from 'styled-components';
// const Img = styled.img`
//   width: 250px;
//   height: 300px;
//   width: 100%;
//   margin-top: 20px;
//   margin-bottom: 20px;
// `;

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
    </Container>
  );
};
// const Card = styled.div`
//   margin-top: 10px;
//   h4 {
//     text-align: center;
//     margin-bottom: 10px;
//     font-size: 1.4rem;
//   }
//   width: 26%;
//   display: flex;
//   flex-direction: column;
//   p {
//     line-height: 1.5;
//   }
// `;
// const Button = styled.button`
//   width: 125px;
//   height: 42px;
//   cursor: pointer;
//   border-radius: 5px;
//   font-size: 18px;
//   padding: 8px;
//   color: white;
//   background-color: #4f455e;
//   &:hover {
//     opacity: 0.7;
//   }
// `;
// const P = styled.p`
//   width: 40%;
// `;
// const Div = styled(animated.div)`
//   display: flex;
//   margin: 0 auto;
//   margin-top: 40px;
//   width: 90%;
//   justify-content: space-evenly;
// `;
// const H1 = styled.h1`
//   text-align: center;
//   margin-top: 10px;
//   font-size: 4rem;
//   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
//     Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
// `;
export default LandingPage;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const NavWrapper = styled.nav`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  padding: 20px 3%;
  z-index: 10;
  font-size: 2rem;
  color: white;
  justify-content: space-between;
  & > * {
    color: white;
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
