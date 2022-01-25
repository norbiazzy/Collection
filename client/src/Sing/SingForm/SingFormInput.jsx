import s from '../Sing.module.css'
import {NavLink} from "react-router-dom";
import {Form, Field} from 'react-final-form'
import {registrationThunk} from "../../redux/authReducer";
import {body} from "express-validator";


const SingFormInput = (props) => {
  const element = props.element || 'input'
  return (
    <Field name={props.name} type={props.type} validate={props.required} render={
      ({input, meta}) => (
        <label className={'d-block mb-2'}>
          {props.nameText ? <p className={s.inpHeader}>{props.nameText}</p> : null}
          <input
            className={s.textInput + ' ' + (meta.error&& meta.touched && s.errorInput)} {...input}/>
        </label>
      )
    }/>
  )
}

export default SingFormInput