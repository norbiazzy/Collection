import {Col, Container, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import NewsUsers from "./News/Users/NewsUsers.jsx";
import ProfileContainer from "./Profile/ProfileContainer";
import ItemsContainer from "./Items/ItemsContainer";
import NewsContainer from "./News/NewsContainer";
import HeaderContainer from "./Header/HeaderContainer";

const Main = () => {
  return (
    <>
      <HeaderContainer/>
      <Container>
        <Row>
          <Col xs={3}>
            <Sidebar/>
          </Col>
          <Col xs={9}>
            <Routes>
              <Route path='/' element={<NewsContainer/>}/>
              <Route exact path={'/profile'} element={<ProfileContainer/>}/>
              <Route path={'/profile/:id'} element={<ProfileContainer/>}/>
              <Route path='/items/:id' element={<ItemsContainer/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Main