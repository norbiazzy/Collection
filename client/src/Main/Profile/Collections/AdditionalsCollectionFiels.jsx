import {FieldArray} from "react-final-form-arrays";
import {Field} from "react-final-form";
import React from "react";
import s from "../../../Sing/Sing.module.css";
import ss from "../Priofile.module.css";


const AdditionallyCollectionFields = ({push, pop, name, validate, title}) => {

  return (<div className={ss.input__item}>
    <div className="buttons d-flex justify-content-around mb-2 align-items-center">
      <button type="button"
              onClick={() => pop(name, undefined)}
              className={'btn btn-dark'}>
        -
      </button>
      <span>{title}</span>
      <button type="button"
              onClick={() => push(name, undefined)}
              className={'btn btn-dark'}>
        +
      </button>
    </div>
    <FieldArray name={name}>
      {({fields}) => fields.map((name) => (
        <div key={name}>
          <Field
            name={name + '.header'}
            validate={validate}
            render={({input, meta}) => (
              <input {...input} className={s.textInput + ' mb-1 ' + (meta.error && meta.touched && s.errorInput)}/>
            )}
          />
        </div>
      ))
      }
    </FieldArray>
  </div>)
  
  
}

export default AdditionallyCollectionFields
