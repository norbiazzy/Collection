import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Main from "./Main/Main";
import Login from "./Sing/Login";
import {loginOutThunk, verifyTokenThunk} from "./redux/authReducer";
import {connect} from "react-redux";
import React, {useCallback, useEffect, useState} from "react";
import Loader from "./Main/all/Loader";
import Registration from "./Sing/Registration";

function App(props) {
  const [loading, setLoading] = useState(true)
  const verify = useCallback(async () => {
    if (!props.token) {
      let auth = JSON.parse(localStorage.getItem('auth'))
      if (auth) await props.verifyTokenThunk(auth.token)
      setLoading(false)
    }
  }, [props.token, loading])

  useEffect(() => {
    verify()
  }, [verify])
  if (loading) return <Loader/>
  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/registration' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path={'*'} element={<Main/>}/>
      </Routes>
    </div>
  );
}

const mapStateToProps = (state) => ({token: state.auth.token})

export default connect(mapStateToProps,
  {
    verifyTokenThunk, loginOutThunk
  }
)(App);
