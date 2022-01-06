import {NavLink} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const Header = () => {
    return (
        <header>
            <Container>
                <Row>
                    <Col>
                        <NavLink className='btn btn-dark' to={'/home'}>Home</NavLink>
                        <NavLink className='btn btn-dark' to={'/profile'}>Profile</NavLink>
                        <NavLink className='btn btn-dark' to={'/users'}>Users</NavLink>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <NavLink  className='btn btn-dark' to={'/login'}>Sing In</NavLink>
                        <NavLink  className='btn btn-dark' to={'/registration'}>Sing UP</NavLink>
                        <button className='btn btn-dark'>Login off</button>
                    </Col>
                </Row>
            </Container>
        </header>
    )
}

export default Header