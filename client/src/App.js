import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Main from "./Main/Main";
import RegistrationContainer from "./Sing/RegistrationContainer";
import LoginContainer from "./Sing/LoginContainer";
import {verifyTokenThunk} from "./redux/authReducer";
import {connect} from "react-redux";
import {useEffect} from "react";


function App(props) {
  useEffect(()=>{
    if (!props.token) {
      let auth = JSON.parse(localStorage.getItem('auth'))
      if (auth) props.verifyTokenThunk(auth.token)
      console.log(1)
    }
  })
  
  console.log(props.token)
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/registration' element={<RegistrationContainer/>}/>
        <Route path='/login' element={<LoginContainer/>}/>
        {/*<Route path='/messages' element={<DialogsContainer/>}/>*/}
        <Route path={'*'} element={<Main/>}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token
})

export default connect(mapStateToProps, {verifyTokenThunk})(App);
