import s from './Sing.module.css'
import {NavLink} from "react-router-dom";

const Registration = (props) => {
  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Registration</h1>
      <form>
        <div className={s.item}>
          <p className={s.text}>Email</p>
          <input className={s.textInput} type="text"/>
        </div>
        <div className={s.item}>
          <p className={s.text}>Password</p>
          <input className={s.textInput} type="password"/>
        </div>
        <div className={s.item}>
          <p className={s.text}>Confirm password</p>
          <input className={s.textInput} type="password"/>
        </div>
        <div className={s.item}>
          <label className={s.label}>
            <span>Admin</span>
            <input type="checkbox"/>
          </label>
        </div>
        <div>
          <button className='btn btn-dark w-100'>Sing Up</button>
        </div>
      </form>
      <div className='d-flex justify-content-between'>
        <p>You have account?</p> <NavLink to={'/login'} className='link-dark'>Sing In</NavLink>
      </div>
    </div>
  )
}


export default Registration