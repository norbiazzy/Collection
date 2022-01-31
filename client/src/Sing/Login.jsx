import s from './Sing.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import {loginThunk} from "../redux/authReducer";
import {Form} from "react-final-form";
import InputForm from "../all/InputForm";
import {connect} from "react-redux";
import {compose} from "redux";
import AuthDataHOC from "../hoc/AuthDataHOC";

const Login = (props) => {
  let navigate = useNavigate()
  useEffect(() => props.iToken ? navigate('/profile') : null)
  let onSubmit = values => {
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
              <InputForm name={"email"} type={"text"} required={required} nameText={"Email"}/>
            </div>
            <div>
              <InputForm name={"password"} type={"password"} required={required} nameText={"Password"}/>
            </div>
            <button disabled={submitting} className={'btn btn-dark w-100'} type="submit">Sing In</button>
          </form>
        )}
      />
      <div className='d-flex justify-content-between'>
        <p>You don't have account?</p> <NavLink to={'/registration'} className='link-dark'>Sing Up</NavLink>
      </div>
      <NavLink to={'/'}>Go to main</NavLink>
    </div>
  )
}


export default compose(
  AuthDataHOC,
  connect(null, {loginThunk})
)(Login)

