import {Col, Container, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import News from "./News/News";
import Users from "./Users/Users";
import ProfileContainer from "./Profile/ProfileContainer";

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
              <Route path='/profile' element={<ProfileContainer/>}/>
              <Route path='/users' element={<Users/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Main