import React, {useState} from "react";
import AmountInputSetting from "./AmountInputSetting";
import s from '../Priofile.module.css'

const NewCollection = (props) => {
  
  let [amountString, setAmountString] = useState(0)
  let [amountNumber, setAmountNumber] = useState(0)
  let [amountText, setAmountText] = useState(0)
  let [amountBoolean, setAmountBoolean] = useState(0)
  let [amountDate, setAmountDate] = useState(0)
  let [tags, setTags] = useState([])
  let [tag, setTag] = useState('')
  let [name, setName] = useState('')
  let [description, setDescription] = useState('')
  let [topic, setTopic] = useState('')
  const handleSaveBtn = () => {
    props.saveCollectionThunk()
  }
  const optionsTopic = props.topics.map((topic, i) => {
    return <option key={i} value={topic}>{topic}</option>
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
  
  const spanTag = tags.map((tag, i) => <span className={s.tag} key={i} onClick={removeTag}>{tag}</span>)
  return (
    <div>
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
          <p>Тема</p>
          <select onChange={(e) => setTopic(e.target.value)}
                  value={topic}>
            {optionsTopic}
          </select>
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
      <div className={'d-flex justify-content-around mb-3'}>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Строковые поля</p>
          <AmountInputSetting count={amountString}
                              maxCount={props.maxAmountInputs.sting}
                              setCount={setAmountString}/>
        </div>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Числовые поля</p>
          <AmountInputSetting count={amountNumber}
                              maxCount={props.maxAmountInputs.numb}
                              setCount={setAmountNumber}/>
        </div>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Текстовые поля</p>
          <AmountInputSetting count={amountText}
                              maxCount={props.maxAmountInputs.text}
                              setCount={setAmountText}/>
        </div>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Чекбоскы</p>
          <AmountInputSetting count={amountBoolean}
                              maxCount={props.maxAmountInputs.numb}
                              setCount={setAmountBoolean}/>
        </div>
        
        <div className={'d-flex flex-column align-items-center'}>
          <p>Поля дат</p>
          <AmountInputSetting count={amountDate}
                              maxCount={props.maxAmountInputs.numb}
                              setCount={setAmountDate}/>
        </div>
      </div>
      <button onClick={handleSaveBtn}
              className={'btn btn-success me-2'}>Save</button>
    </div>
  )
}

export default NewCollection