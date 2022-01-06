import s from './Sing.module.css'
import {NavLink} from "react-router-dom";
import React from "react";

const Registration = (props) => {

  let email = React.createRef()
  let password = React.createRef()
  const log = (e)=> {
    e.preventDefault()
    let body = {
      email: email.current.value,
      password: password.current.value,
      role: 'user',
    }
    console.log(1)
    props.registrationUserThunkCreate(body)
  }
  // const handleBtn = (e) => {
  //   e.preventDefault()
  //   let body= JSON.stringify({
  //     password: password.current.value,
  //         role: 'admin',
  //         email: email.current.value,
  //   })
  //
  //   let headers =  {}
  //   headers['Content-Type'] = 'application/json'
  //   let res = fetch('/api/auth/register', {
  //     method: 'POST',
  //     body: body,
  //     headers
  //   }).then((res)=>{
  //     return res.json()
  //   }).then((data)=>{
  //
  //     console.log(data.message)
  //   })
  // }
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Registration</h1>
      <form>
        <div className={s.item}>
          <p className={s.text}>Email</p>
          <input className={s.textInput} ref={email} type="text"/>
        </div>
        <div className={s.item}>
          <p className={s.text}>Password</p>
          <input className={s.textInput} ref={password} type="password"/>
        </div>
        {/*<div className={s.item}>*/}
        {/*  <p className={s.text}>Confirm password</p>*/}
        {/*  <input className={s.textInput} type="password"/>*/}
        {/*</div>*/}
        <div className={s.item}>
          <label className={s.label}>
            <span>Admin</span>
            <input type="checkbox"/>
          </label>
        </div>
        <div>
          <button className='btn btn-dark w-100' onClick={log}>Sing Up</button>
        </div>
      </form>
      <div className='d-flex justify-content-between'>
        <p>You have account?</p> <NavLink to={'/login'} className='link-dark'>Sing In</NavLink>
      </div>
    </div>
  )
}


export default Registration