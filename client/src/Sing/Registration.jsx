import s from './Sing.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {Form, Field} from 'react-final-form'
import {registrationThunk} from "../redux/authReducer";
import {body} from "express-validator";
import SingFormInput from "./SingForm/SingFormInput";


const Registration = (props) => {
  const navigate = useNavigate()
  let onSubmit = values => {
    const body = {
      ...values,
      role: values.role ? 'admin' : 'user',
    }
    props.registrationThunk(body).then((result)=>{
      if (result) navigate('/profile')
    })

  }
  const required = value => (value ? undefined : true)
  return (

    <div className={s.wrapper}>
      <h1 className={s.title}>Registration</h1>
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
            <div>
              <Field name="role" type={'checkbox'} render={
                ({input, meta}) => (
                  <label className={'d-flex py-2 align-items-center'}>
                    <span className={'pe-2'}>Admin</span>
                    <input {...input}/>
                  </label>
                )
              }/>
            </div>
            <button disabled={submitting} className={'btn btn-dark w-100'} type="submit">Sing Up</button>
          </form>
        )}
      />
      <div className='d-flex justify-content-between'>
        <p>You have account?</p> <NavLink to={'/login'} className='link-dark'>Sing In</NavLink>
      </div>
    </div>
  )
}


export default Registration