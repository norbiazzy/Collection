import s from '../Sing.module.css'
import {NavLink} from "react-router-dom";
import {Form, Field} from 'react-final-form'
import {registrationThunk} from "../../redux/authReducer";
import {body} from "express-validator";


const InputForm = (props) => {
  return (
    <Field name={props.name} type={props.type} validate={props.required} initialValue={props.initialValue} render={
      ({input, meta, initialValue}) => (
        <label className={'d-block mb-2'}>
          {props.nameText ? <p className={s.inpHeader}>{props.nameText}</p> : null}
          <input value={initialValue} onChange={props.onChange}
                 className={s.textInput + ' ' + (meta.error && meta.touched && s.errorInput)} {...input}/>
        </label>
      )
    }/>
  )
}
const InputForm2 = (({name, component, type, validate, onChange, title}) => {
  return (<label className={'d-block mb-2'}>
    {title ? <p className={s.inpHeader}>{title}</p> : null}
    <Field name={name} validate={validate} onChange={onChange} type={type} component={component} />
  </label>)
})

export default InputForm