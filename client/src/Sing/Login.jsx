import s from './Sing.module.css'
import {NavLink, Redirect, useNavigate} from "react-router-dom";
import React from "react";
import {loginThunk} from "../redux/authReducer";

const Login = (props) => {
  let navigate = useNavigate()
  let email = React.createRef()
  let password = React.createRef()
  if (props.token) navigate('/profile')
  const handleBtn = (e) => {
    e.preventDefault()
    console.log(props)
    let body = {
      password: password.current.value,
      email: email.current.value,
    }
    props.loginThunk(body)
  }

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Login</h1>
      <form>
        <div className={s.item}>
          <p className={s.text}>Email</p>
          <input className={s.textInput} type="text" ref={email}/>
        </div>
        <div className={s.item}>
          <p className={s.text}>Password</p>
          <input className={s.textInput} type="password" ref={password}/>
        </div>
        <div>
          <button className='btn btn-dark w-100 mb-2' onClick={handleBtn}>Login in</button>
        </div>
      </form>
      <div className='d-flex justify-content-between'>
        <p>You have account?</p> <NavLink to={'/registration'} className='link-dark'>Sing Up</NavLink>
      </div>
      <NavLink to={'/profile'}>Profile</NavLink>
    </div>
  )
}


export default Login