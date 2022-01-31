import {Field} from "react-final-form";
import s from "../Sing/Sing.module.css";

export const TextareaForm = (props) => {
  return (
    <Field name={props.name} required={props.required} initialValue={props.initialValue} render={
      ({input, meta,initialValue}) => (
        <label className={'d-block mb-2'}>
          {props.nameText ? <p className={s.inpHeader}>{props.nameText}</p> : null}
          <textarea value={initialValue}
            className={s.textareaInput +' ' + s.textInput + ' ' + (meta.error && meta.touched && s.errorInput)} {...input}/>
        </label>
      )
    }/>
  )
}