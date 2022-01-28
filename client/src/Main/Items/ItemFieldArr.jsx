import React, {useCallback, useDebugValue, useEffect, useMemo} from "react";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {useState} from "react";
import InputForm from "../../Sing/SingForm/InputForm";
import {TextareaForm} from "../all/TextareaForm";
import s from "../Profile/Priofile.module.css";
import ss from "../../Sing/Sing.module.css";
import {Field, Form} from "react-final-form";
import arrayMutators from 'final-form-arrays'
import ItemAdditionalInputs from "./ItemAdditionalInputs";
import {FieldArray} from 'react-final-form-arrays'
import ReactSelectAdapter from "../all/ReactSelectAdapter";
import AdditionallyCollectionFields from "../Profile/Collections/AdditionalsCollectionFiels";
import Loader from "../all/Loader";


const NewItemFieldArr = ({name, headers, ...rest}) => {
  debugger
  const [fields, setFields] = useState([])
  const [values, setValues] = useState(headers)
  let arrFields = []
  const setFieldsArr = useMemo((values) => {
    debugger
    for (let i = 0; i < values.length; i++) {
      // setFields((prevState) => ({
      //   ...prevState,
      //   header: headers[i][name].header
      // }))
      setFields(prevState => [...prevState,
        <Field name={name + '.value'} component={rest.component} type={rest.type}/>])
      
      // arrFields.push(<Field name={name + '.value'} component={rest.component} type={rest.type}/>)
    }
  }, [values, name])
  
  useEffect(() => setFieldsArr(), [setFieldsArr])
  debugger
  if (!fields.length) return <Loader/>
  return (
    <FieldArray name={name}>
      {() => fields.map((name) => (
          <div key={name}>
            {fields}
          </div>
        )
      )
      }
    </FieldArray>
  )
}
export default compose(
  AuthDataHOC,
)(NewItemFieldArr)

