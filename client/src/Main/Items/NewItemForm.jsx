import React, {useCallback} from "react";
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


const NewItemForm = (props) => {
  
  let [tags, setTags] = useState([])
  let [tag, setTag] = useState('')
  const [body, setBody] = useState({
    'string': [],
    'number': [],
    'text': [],
    'checkbox': [],
    'date': [],
  })
  const setValueInp = useCallback(e => {
    const data = e.target.dataset.id.split('-')
    const key = data[0]
    const index = data[1]
    const value = (key === 'checkbox' ? e.target.checked : e.target.value)
    
    setBody(prevState => {
      debugger
      return {
        ...prevState,
        ...prevState[key][index] = value
      }
    })
    console.log(body)
  }, [setBody])
  
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
    console.log('easd')
  }
  
  let onSubmit = values => {
    console.log('a')
  }
  const headers = []
  for (const headerType in props.headers) {
    props.headers[headerType].map((header, i) => <InputForm name={headerType + i}
                                                            nameText={props.headers[headerType]}/>)
    
  }
  let array = []
  for (let asd = 0; asd < 5; asd++) {
    array.push(<Field type={'textarea'} name={'asd' + asd} component={'input'}/>)
  }
  
  
  const required = useCallback(value => (value ? undefined : true))
  return (
    <Form
      onSubmit={onSubmit}
      validate={required}
      mutators={{
        ...arrayMutators
      }}
      render={({
                 handleSubmit,
                 form: {
                   mutators: {push, pop}
                 },
                 pristine,
                 form,
                 submitting,
                 values
               }) => {
        props.setSubmit(handleSubmit)
        return (
          <form onSubmit={handleSubmit}>
            {array}
            asdasdas
            <div>
              <InputForm name={"name"} type={"text"} required={required} nameText={"Item name"}/>
            </div>
            <div>
              <TextareaForm name={"description"} nameText={"Description"}/>
            </div>
            <div className={'mb-2'}>
              <div>
                <label className={'d-block mb-2'}>
                  <input className={ss.textInput + ' mb-2'} value={tag} onChange={changeTagInput}
                         placeholder={'Tag...'}/>
                </label>
                <div className={'d-flex align-content-center'}>
                  <button
                    disabled={!tag}
                    onClick={addTag}
                    className={'btn btn-dark'}>+
                  </button>
                  {tags.map((tag, i) => <span className={s.tag} key={i} onClick={removeTag}>{tag}</span>)}
                </div>
              </div>
            </div>
  
            <FieldArray name="checkbox">
              {({ fields }) =>
                fields.map((name, index) => (
                  <div key={name}>
                    <label>Cust. #{index + 1}</label>
                    <Field
                      name={`${name}.firstName`}
                      component="input"
                      placeholder="First Name"
                    />
                    <Field
                      name={`${name}.lastName`}
                      component="input"
                      placeholder="Last Name"
                    />
                  </div>
                ))
              }
            </FieldArray>
            <ItemAdditionalInputs setValueInp={setValueInp} headers={props.headers}/>
          </form>
        )
      }}
    />
  )
}
// const mapStateToProps = (state) => ({
// topics: getTopicsSelect(state)
// })
export default compose(
  AuthDataHOC,
  // connect(mapStateToProps),
)(NewItemForm)

