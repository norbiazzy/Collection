import Header from "./Header/Header";
import {Col, Container, Row} from "react-bootstrap";
import Sidebar from "./Sidebar/Sidebar";
import {Route, Routes} from "react-router-dom";
import News from "./News/News";
import Profile from "./Profile/Profile";
import Users from "./Users/Users";

const Main = () => {
  return (
    <>
      <Header/>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidebar/>
          </Col>
          <Col xs={9}>
            <Routes>
              <Route path='/home' element={<News/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/users' element={<Users/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Main