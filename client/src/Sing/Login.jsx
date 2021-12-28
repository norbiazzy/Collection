import s from './Sing.module.css'
import {NavLink} from "react-router-dom";

const Login =  (props)=>{
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Login</h1>
      <form>
        <div className={s.item}>
          <p className={s.text}>Email</p>
          <input className={s.textInput} type="text"/>
        </div>
        <div className={s.item}>
          <p className={s.text}>Password</p>
          <input className={s.textInput} type="password"/>
        </div>
        <div>
          <button className='btn btn-dark w-100 mb-2'>Login in</button>
        </div>
      </form>
      <div className='d-flex justify-content-between'>
        <p>You have account?</p> <NavLink to={'/registration'} className='link-dark'>Sing Up</NavLink>
      </div>
    </div>
  )
}



export default Login