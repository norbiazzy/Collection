import React, {useCallback} from "react";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {useState} from "react";
import InputForm from "../../Sing/SingForm/InputForm";
import {TextareaForm} from "../all/TextareaForm";
import s from "../Profile/Priofile.module.css";
import ss from "../../Sing/Sing.module.css";
import {Form} from "react-final-form";
import ItemAdditionalInputsTEST from "./ItemAdditionalInputsTEST";
import {saveItemThunk} from "../../redux/ItemsReducer";
import {connect} from "react-redux";

const NewItemForm = (props) => {

  let [tags, setTags] = useState([])
  let [initialValues, setInitialValue] = useState({headers: {checkbox: new Array(props.headers && props.headers.checkbox && props.headers.checkbox.length).fill(false)}})
  let tagInp = React.createRef()
  const removeTag = (e) => {
    let filerTags = [...tags.filter(tag => {
      return tag !== e.target.innerText
    })]
    setTags(filerTags)
  }

  const addTag = (values) => {
    setInitialValue(values)
    setTags([...tags, tagInp.current.value.trim()])
    tagInp.current.value = ''
  }

  let onSubmit = values => {
    
    const body = {...values, tags, collectionId: props.collectionId}
    props.saveItemThunk(props.iToken, body)
  }

  const required = useCallback(value => (value ? undefined : true))

  return (
    <Form
      onSubmit={onSubmit}
      validate={required}
      initialValues={initialValues}
      render={({handleSubmit, values}) => {
        props.setSubmit(handleSubmit)
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <InputForm name={"name"} type={"text"} required={required} nameText={"Item name"}/>
            </div>
            <div>
              <TextareaForm name={"description"} nameText={"Description"}/>
            </div>
            <div className={'mb-2'}>
              <div>
                <label className={'d-block mb-2'}>
                  <input ref={tagInp} className={ss.textInput + ' mb-2'}
                         placeholder={'Tag...'}/>
                </label>
                <div className={'d-flex align-content-center'}>
                  <button
                    type={'button'}
                    disabled={false}
                    onClick={() => addTag(values)}
                    className={'btn btn-dark'}>+
                  </button>
                  {tags.map((tag, i) => <span className={s.tag} key={i} onClick={removeTag}>{tag}</span>)}
                </div>
              </div>
            </div>
            <ItemAdditionalInputsTEST required={required} headers={props.headers}/>
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
  connect(null, {saveItemThunk}),
)(NewItemForm)

