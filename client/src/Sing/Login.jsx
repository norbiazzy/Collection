import s from './Sing.module.css'
import {NavLink, Redirect, useNavigate} from "react-router-dom";
import React from "react";
import {loginThunk} from "../redux/authReducer";
import {Field, Form} from "react-final-form";
import SingFormInput from "./SingForm/SingFormInput";

const Login = (props) => {
  let navigate = useNavigate()
  if (props.token) navigate('/profile')

  let onSubmit = values => {
    debugger
    props.loginThunk(values)
  }
  const required = value => (value ? undefined : true)
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Login</h1>

      <Form
        onSubmit={onSubmit}
        validate={required}
        render={({handleSubmit, submitting}) => (
          <form onSubmit={handleSubmit}>
            <div>
              <SingFormInput name={"email"} type={"text"} required={required} nameText={"Email"}/>
            </div>
            <div>
              <SingFormInput name={"password"} type={"password"} required={required} nameText={"Password"}/>
            </div>
            <button disabled={submitting} className={'btn btn-dark w-100'} type="submit">Sing In</button>
          </form>
        )}
      />
      <div className='d-flex justify-content-between'>
        <p>You don't have account?</p> <NavLink to={'/registration'} className='link-dark'>Sing Up</NavLink>
      </div>
    </div>
  )
}


export default Login