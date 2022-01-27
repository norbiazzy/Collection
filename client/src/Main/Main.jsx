import {Col, Container, Row} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import NewsUsers from "./News/Users/NewsUsers.jsx";
import NewsContainer from "./News/NewsContainer";
import HeaderContainer from "./Header/HeaderContainer";
import Profile from "./Profile/Profile";
import ItemsTable from "./Items/ItemsTable";

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
              <Route exact path={'/profile'} element={<Profile/>}/>
              <Route path={'/profile/:id'} element={<Profile/>}/>
              <Route path='/items/:id' element={<ItemsTable/>}/>
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Main