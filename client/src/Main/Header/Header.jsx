import {NavLink} from "react-router-dom";
import {Container} from "react-bootstrap";

const Header = () => {
  return (
    <header>
      <Container>
        <div>
          <NavLink to={'/home'}>Home</NavLink>
          <NavLink to={'/profile'}>Profile</NavLink>
          <NavLink to={'/users'}>Users</NavLink>
        </div>
      </Container>
    </header>
  )
}

export default Header