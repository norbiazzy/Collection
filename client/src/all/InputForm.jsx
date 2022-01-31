import s from '../Sing/Sing.module.css'
import {Field} from 'react-final-form'


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

export default InputForm