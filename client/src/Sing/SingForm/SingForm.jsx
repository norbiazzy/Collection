import s from '../Sing.module.css'
import {NavLink} from "react-router-dom";
import {Form, Field} from 'react-final-form'
import {registrationThunk} from "../../redux/authReducer";
import {body} from "express-validator";


const SingForm = (props) => {

  let onSubmit = values => {
    const body = {
      ...values,
      role: values.role ? 'admin' : 'user',
    }
    debugger
    props.registrationThunk(body)
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
              <Field name="email" type={'text'} validate={required} render={
                ({input, meta}) => (
                  <label className={'d-block mb-2'}>
                    <p className={s.inpHeader}>Email</p>
                    <input
                      className={s.textInput + ' ' + (meta.error && s.errorInput)} {...input}/>
                  </label>
                )
              }/>
            </div>
            <div>
              <Field name="password" type={'password'} validate={required} render={
                ({input, meta}) => (
                  <label className={'d-block'}>
                    <p className={s.inpHeader}>Password</p>
                    <input
                      className={s.textInput + ' ' + (meta.error && s.errorInput)} {...input}/>
                  </label>
                )
              }/>
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


export default SingForm