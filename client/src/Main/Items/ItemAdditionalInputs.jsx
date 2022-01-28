import {Field} from "react-final-form";
import s from "../../Sing/Sing.module.css";
import React from "react";
import InputForm from "../../Sing/SingForm/InputForm";
import {TextareaForm} from "../all/TextareaForm";

// const ItemAdditionalInputs = ({headers, require}) => {
  // const createFields = (h, i, name, component, type, centerStyle = false) => {
  //   return (<Field type={type} name={name + i} validate={require} render={({input,meta}) => (
  //     <label key={i + h} className={'d-flex mb-2 ' + (centerStyle ? 'align-items-center' : null)}>
  //       <p className={'mb-1 me-1'}>{h}</p>
  //       {name === 'text'
  //         ? <textarea data-id={name + '-' + i} className={s.textInput} onChange={setValueInp}/>
  //         : <input {...input} className={(centerStyle ? null : s.textInput) + (meta.error && meta.touched)}/>}
  //     </label>
  //   )}/>)
  // }
  // const createFields = (h, i, name, type, component) => <InputForm/>
  //
  // const strings = headers.string.map((h, i) => createFields(h, i, 'string', 'text'))
  // const numbers = headers.number.map((h, i) => createFields(h, i, 'number', 'number'))
  // const texts = headers.string.map((h, i) => <TextareaForm name={'ads'}/>
  // const checkboxes = headers.string.map((h, i) => createFields(h, i, 'checkbox', 'checkbox', true))
//   // const dates = headers.string.map((h, i) => createFields(h, i, 'date', 'date'))
//   return (<div>
//     <p>Additional fields</p>
//     <div>
//       {strings.length ? (<div>
//         <h5 className={'mb-2'}>Strings</h5>
//         {strings}
//       </div>) : null}
//       {numbers.length ? (<div>
//         <h5 className={'mb-2'}>Number</h5>
//         {numbers}
//       </div>) : null}
//       {texts.length ? (<div>
//         <h5 className={'mb-2'}>Text</h5>
//         {texts}
//       </div>) : null}
//       {checkboxes.length ? (<div>
//         <h5 className={'mb-2'}>Checkbox</h5>
//         {checkboxes}
//       </div>) : null}
//       {dates.length ? (<div>
//         <h5 className={'mb-2'}>Date</h5>
//         {dates}
//       </div>) : null}
//     </div>
//   </div>)
// }
const ItemAdditionalInputs = ({headers, setValueInp}) => {
  const createFields = (h, i, name, type, centerStyle = false) => {
    return (<label key={i+h} className={'d-flex mb-2 ' + (centerStyle ? 'align-items-center' : null)}>
      <p className={'mb-1 me-1'}>{h}</p>
      {name === 'text'
        ? <textarea data-id={name + '-' + i} className={s.textInput} onChange={setValueInp}/>
        : <input data-id={name + '-' + i} onChange={setValueInp} type={type}
                 className={centerStyle ? null : s.textInput}/>}
    </label>)
  }
  let strings = headers.string.map((h, i) => createFields(h, i, 'string', 'text'))
  let numbers = headers.number.map((h, i) => createFields(h, i, 'number', 'number'))
  let texts = headers.string.map((h, i) => createFields(h, i, 'text'))
  let checkboxes = headers.string.map((h, i) => createFields(h, i, 'checkbox', 'checkbox', true))
  let dates = headers.string.map((h, i) => createFields(h, i, 'date', 'date'))
  return (<div>
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
  </div>)
}

export default ItemAdditionalInputs