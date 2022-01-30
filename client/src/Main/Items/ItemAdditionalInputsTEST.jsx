import {Field} from "react-final-form";
import s from "../../Sing/Sing.module.css";
import React from "react";

const ItemAdditionalInputsTEST = ({headers, required}) => {

  const createFields = (h, i, name, type, centerStyle = false) => {

    return (
      <Field key={i + h} validate={type === 'checkbox' ? null : required} name={'headers.' + name + `[${i}]`}
             type={type}
             render={({input, meta}) => (
               <label className={'d-flex mb-2 ' + (centerStyle ? 'align-items-center' : null)}>
                 <p className={'mb-1 me-1'}>{h}</p>
                 {name === 'textarea'
                   ? <textarea {...input}
                               className={`${s.textareaInput} ${s.textInput} ` + (meta.error && meta.touched ? s.errorInput : '')}/>
                   :
                   <input {...input}
                          className={`${s.textInput} ` + (meta.error && meta.touched ? s.errorInput : '')}/>}
               </label>
             )}/>
    )
  }

  let strings = headers.text.map((h, i) => createFields(h.header, i, 'text', 'text'))
  let numbers = headers.number.map((h, i) => createFields(h.header, i, 'number', 'number'))
  let texts = headers.textarea.map((h, i) => createFields(h.header, i, 'textarea'))
  let checkboxes = headers.checkbox.map((h, i) => createFields(h.header, i, 'checkbox', 'checkbox', true))
  let dates = headers.date.map((h, i) => createFields(h.header, i, 'date', 'date'))
  return (
    <div>
      <p>Additional fields</p>
      <div>
        {strings.length ? (<div>
          <h5 className={'mb-2'}>Strings</h5>
          {strings}
        </div>) : null}
        {numbers.length ? (<div>
          <h5 className={'mb-2'}>Number</h5>
          {numbers}
        </div>) : null}
        {texts.length ? (<div>
          <h5 className={'mb-2'}>Text</h5>
          {texts}
        </div>) : null}
        {checkboxes.length ? (<div>
          <h5 className={'mb-2'}>Checkbox</h5>
          {checkboxes}
        </div>) : null}
        {dates.length ? (<div>
          <h5 className={'mb-2'}>Date</h5>
          {dates}
        </div>) : null}
      </div>
    </div>
  )
}

export default ItemAdditionalInputsTEST