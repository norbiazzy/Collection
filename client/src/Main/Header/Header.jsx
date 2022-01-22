import {NavLink} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const Header = (props) => {
  const loginOut = () => {
    props.loginOutThunk()
  }
  const toggleAdminMod = (e) => {
    props.toggleAdminModAC(e.target.checked)
  }
  return (
    <header>
      <Container>
        <Row>
          <Col>
            <NavLink className='btn btn-dark' to={'/'}>Home</NavLink>
            {/*<NavLink className='btn btn-dark' to={'/users'}>NewsUsers</NavLink>*/}
          </Col>
          <Col className='d-flex justify-content-end'>
            {props.token ?
              (<>
                {props.role === 'admin' ? <label className={'d-flex align-items-center me-2'}>
                  <span>Режим админа</span>
                  <input type={"checkbox"} checked={props.adminMod} onChange={toggleAdminMod}/>
                </label>: null}

                <NavLink className='btn btn-dark me-2' to={'/profile'}>Profile</NavLink>
                <button className='btn btn-dark' onClick={loginOut}>Login out</button>
              </>) : (<>
                <NavLink className='btn btn-dark me-2' to={'/login'}>Sing In</NavLink>
                <NavLink className='btn btn-dark' to={'/registration'}>Sing UP</NavLink></>)}
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header