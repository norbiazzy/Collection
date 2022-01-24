import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import s from "../Profile/Priofile.module.css";


const ItemsForm = (props) => {

  let [tags, setTags] = useState([])
  let [tag, setTag] = useState('')
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  const [bodyInputs, setBodyInputs] = useState({
    'str': [],
    'num': [],
    'text': [],
    'boolean': [],
    'date': [],
  })

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

  const saveItem = () => {

    let item = {
      name, tags, bodyInputs: {
        str: bodyInputs['str'],
        num: bodyInputs['num'],
        text: bodyInputs['text'],
        boolean: bodyInputs['boolean'],
        date: bodyInputs['date']
      }, description,
      collectionId: props.collectionId
    }
    props.saveItemThunk(props.token, item)
  }

  const handleInput = (e) => {
    setBodyInputs((prevState) => ({
      ...prevState,
      ...prevState['str'],
      ...prevState['num'],
      ...prevState['text'],
      ...prevState['boolean'],
      ...prevState['date'],
      ...prevState[e.target.dataset.key][e.target.dataset.id] = e.target.value
    }))
  }

  let srtHeaders = props.headersInp['str'].map((h, i, a) => <div key={i} className={'d-flex'}><p>{h}</p><input
    data-key={'str'}
    data-id={i}
    value={bodyInputs['str'][i] || ''}
    onChange={handleInput}
    type={'text'}/></div>)
  let numHeaders = props.headersInp['num'].map((h, i, a) => <div key={i} className={'d-flex'}><p>{h}</p><input
    data-key={'num'}
    data-id={i}
    value={bodyInputs['num'][i] || ''}
    onChange={handleInput}
    type={'number'}/></div>)
  let textHeaders = props.headersInp['text'].map((h, i, a) => (
    <div key={i} className={'d-flex'}><p>{h}</p><textarea data-key={'text'}
                                                          data-id={i}
                                                          value={bodyInputs['text'][i] || ''}
                                                          onChange={handleInput}/>
    </div>))
  let booleanHeaders = props.headersInp['boolean'].map((h, i, a) => <div key={i} className={'d-flex'}><p>{h}</p><input
    data-key={'boolean'}
    data-id={i}
    value={bodyInputs['boolean'][i] || ''}
    onChange={handleInput}
    type={'checkbox'}/>
  </div>)
  let dateHeaders = props.headersInp['date'].map((h, i, a) => <div key={i} className={'d-flex'}><p>{h}</p><input
    data-key={'date'}
    data-id={i}
    value={bodyInputs['date'][i] || ''}
    onChange={handleInput}
    type={'date'}/></div>)
  const spanTag = tags.map((tag, i) => <span className={s.tag} key={i} onClick={removeTag}>{tag}</span>)
  return (
    <>
      <div className={'d-flex'}>
        <div className={'me-4'}>
          <p>Имя</p>
          <input type={"text"} onChange={(e) => {
            setName(e.target.value)
          }} value={name}/>
        </div>
        <div className={'me-4'}>
          <p>Описание</p>
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
      <div className={'d-flex flex-column'}>
        <div>{srtHeaders}</div>
        <div>{numHeaders}</div>
        <div>{textHeaders}</div>
        <div>{booleanHeaders}</div>
        <div>{dateHeaders}</div>
      </div>
      <button onClick={saveItem}>Save</button>
    </>
  );
}

export default ItemsForm