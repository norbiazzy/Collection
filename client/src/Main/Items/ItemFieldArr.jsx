import React from "react";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {Field} from "react-final-form";
import {FieldArray} from 'react-final-form-arrays'
import Loader from "../all/Loader";


const NewItemFieldArr = ({name, headers, ...rest}) => {
  // const setFieldsArr = (values) => {
  //   let arrFields = []
  //
  //   for (let i = 0; i < values.length; i++) {
  //
  //     arrFields.push(<Field key={i} component={rest.component} type={rest.type} name={}/>)
  //   }
  //   return arrFields
  // }
  // let fields = setFieldsArr(headers)
  // if (!fields.length) return <Loader/>
  if (!headers.length) return <div>Нет нихуя</div>

  return (

    <FieldArray name={name}>

      {({ fields }) =>
        fields.map((name, index) => (
          <div key={name}>
            <label>{index + 1}</label>
            <Field
              name={`${name}.body`}
              component="input"
              placeholder="First Name"
            />
          </div>
        ))
      }
    </FieldArray>
  )
}
export default compose(
  AuthDataHOC,
)(NewItemFieldArr)

