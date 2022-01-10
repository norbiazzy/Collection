import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import s from "../Profile/Priofile.module.css";


const ItemsForm = (props) => {
  
  let [tags, setTags] = useState([])
  let [tag, setTag] = useState('')
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  
  const removeTag = (e) => {
    let filerTags = [...tags.filter(tag => {
      return tag !== e.target.innerText
    })]
    setTags(filerTags)
  }
  const addTag = () => {
    setTags([...tags, tag])
    setTag('')
  }
  const changeTagInput = (e) => {
    setTag(e.target.value)
  }
  let srtInputs = Array(props.amounthInputs.str).fill(<input type={"text"}/>)
  let numInputs = Array(props.amounthInputs.num).fill(<input type={"numer"}/>)
  let textInputs = Array(props.amounthInputs.text).fill(<textarea/>)
  let booleanInputs = Array(props.amounthInputs.boolean).fill(<div><input type={"checkbox"}/><input type={"text"}/>
  </div>)
  let dateInputs = Array(props.amounthInputs.date).fill(<input type={"date"}/>)
  const spanTag = tags.map((tag, i) => <span className={s.tag} key={i} onClick={removeTag}>{tag}</span>)
  return (
    <>
      <div className={'d-flex'}>
        <div className={'me-4'}>
          <p>Имя коллекции</p>
          <input type={"text"} onChange={(e) => {
            setName(e.target.value)
          }} value={name}/>
        </div>
        <div className={'me-4'}>
          <p>Описание коллекции</p>
          <textarea value={description} onChange={(e) => {
            setDescription(e.target.value)
          }}/>
        </div>
        
        <div className={'me-4'}>
          <p>Теги</p>
          <input value={tag} onChange={changeTagInput} placeholder={'Tag...'}/>
          <button
            disabled={!tag}
            onClick={addTag}
            className={'btn btn-dark'}>+
          </button>
          <div>{spanTag}</div>
        </div>
      </div>
      <div className={'d-flex'}>
        <div className={'d-flex flex-column'}>{srtInputs}</div>
        <div className={'d-flex flex-column'}>{numInputs}</div>
        <div className={'d-flex flex-column'}>{textInputs}</div>
        <div className={'d-flex flex-column'}>{booleanInputs}</div>
        <div className={'d-flex flex-column'}>{dateInputs}</div>
      </div>
    </>
  )
}

export default ItemsForm