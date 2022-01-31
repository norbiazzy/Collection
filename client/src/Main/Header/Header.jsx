import {NavLink} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {compose} from "redux";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {loginOutThunk, toggleAdminModAC} from "../../redux/authReducer";

const Header = (props) => {
  const loginOut = () => {
    props.loginOutThunk()
  }
  const toggleAdminMod = (e) => {
    props.toggleAdminModAC(e.target.checked)
  }
  return (
    <header className={'py-2'}>
      <Container>
        <Row>
          <Col>
            <NavLink className='btn btn-dark me-2' to={'/'}>Collections</NavLink>
            <NavLink className='btn btn-dark me-2' to={'/news/items'}>Items</NavLink>
            <NavLink className='btn btn-dark me-2' to={'/news/users'}>Users</NavLink>
          </Col>
          <Col className='d-flex justify-content-end'>
            {props.iToken ?
              (<>
                {props.iRole === 'admin' ? <label className={'d-flex align-items-center me-2'}>
                  <span>Режим админа</span>
                  <input type={"checkbox"} checked={props.iAdminMod} onChange={toggleAdminMod}/>
                </label> : null}

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

export default compose(AuthDataHOC, connect(null, {
    loginOutThunk,
    toggleAdminModAC,
  })
)(Header)