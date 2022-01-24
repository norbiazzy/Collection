import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Route, Routes} from 'react-router-dom';
import Main from "./Main/Main";
import RegistrationContainer from "./Sing/RegistrationContainer";
import LoginContainer from "./Sing/LoginContainer";
import {setTokenAC, verifyTokenThunk} from "./redux/authReducer";
import {connect} from "react-redux";
import {useCallback, useEffect, useState} from "react";

function App(props) {
  const [loading, setLoading] = useState(true)
  const verify = useCallback(() => {
    if (!props.token) {
      let auth = JSON.parse(localStorage.getItem('auth'))
      if (auth) props.verifyTokenThunk(auth.token).then(() => {
        setLoading(false)
      })
      else setLoading(false)

    }
  }, [props.token, loading])

  useEffect(() => {
    verify()
  }, [verify])

  if (loading) return (
    <div className="spinner-border position-absolute top-50 start-50" role="status">
      <span className="visually-hidden ">Loading...</span>
    </div>
  )

  return (

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

const mapStateToProps = (state) => (
{
  token: state.auth.token
}
)

export default connect(mapStateToProps,
{
  verifyTokenThunk, setTokenAC
}
)(App);
