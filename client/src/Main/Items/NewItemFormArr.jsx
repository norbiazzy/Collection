import React, {useCallback, useDebugValue, useEffect} from "react";
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
import ItemFieldArr from "./ItemFieldArr";


const NewItemFormArr = (props) => {
  
  let [tags, setTags] = useState([])
  let [tag, setTag] = useState('')
  
  const removeTag = (e) => {
    let filerTags = [...tags.filter(tag => {
      return tag !== e.target.innerText
    })]
    setTags(filerTags)
  }
  
  const addTag = () => {
    setTags([...tags, tag.trim()])
    setTag('')
  }
  const changeTagInput = (e) => {
    setTag(e.target.value.trim())
  }
  
  let onSubmit = values => {
    console.log(values)
  }
  
  const required = useCallback(value => (value ? undefined : true))
  return (<Form
    onSubmit={onSubmit}
    mutators={{
      ...arrayMutators
    }}
    render={({
               handleSubmit, form: {mutators: {push}}, pristine, form,
               submitting, values
             }) => (
      <form onSubmit={handleSubmit}>
        {props.headers.text.length ? <ItemFieldArr name={'text1'} headers={props.headers.text} component={'input'} type={'text'}/> : null}
        {props.headers.number.length ? <div> 2</div> : null}
        {props.headers.textarea.length ? <div> 3</div> : null}
        {props.headers.checkbox.length ? <div> 4</div> : null}
        {props.headers.date.length ? <div> 5</div> : null}
      </form>
    )
    }
  />)
}
export default compose(
  AuthDataHOC,
)(NewItemFormArr)

