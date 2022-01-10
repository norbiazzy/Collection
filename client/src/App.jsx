import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Main from "./Main/Main";
import RegistrationContainer from "./Sing/RegistrationContainer";
import LoginContainer from "./Sing/LoginContainer";
import {setTokenAC, verifyTokenThunk} from "./redux/authReducer";
import {connect} from "react-redux";
import {useEffect} from "react";
// import {useAuth} from "./hooks/auth.hook";
// import {AuthContext} from "../context/AuthContext";

function App(props) {
  // test
  //
  // const {token, login, logout, userId, ready} = useAuth()
  // let isAuthenticated = !!auth.token
  // if (auth.ready) return <div>loading</div>
  
  // time
  // useEffect(()=>{
    if (!props.token) {
      let auth = JSON.parse(localStorage.getItem('auth'))
      
      if (auth) props.setTokenAC(auth.token)
      // if (auth) props.verifyTokenThunk(auth.token)
      // console.log(1)
    }
  // })
  
  console.log(props.token)
  return (/*
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>*/
      <div className='wrapper'>
        <Routes>
          <Route path='/registration' element={<RegistrationContainer/>}/>
          <Route path='/login' element={<LoginContainer/>}/>
          {/*<Route path='/messages' element={<DialogsContainer/>}/>*/}
          <Route path={'*'} element={<Main/>}/>
        </Routes>
      </div>
    /*</AuthContext.Provider>*/
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token
})

export default connect(mapStateToProps, {verifyTokenThunk, setTokenAC})(App);
