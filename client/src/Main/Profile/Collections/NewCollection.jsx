import React, {useEffect, useState} from "react";
import AmountInputSetting from "./AmountInputSetting";
import s from '../Priofile.module.css'
import login from "../../../Sing/Login";

const useInput = (initialValue) => {
  let [value, setValue] = useState(initialValue)
  
  const onChange = (e) => setValue(e.target.value)
  const clear = () => setValue('')
  return {
    bind: {value, onChange},
    value, clear
  }
}
const useCounter = (initialValue = 0) => {
  let [value, setValue] = useState(initialValue)
  
  const add = () => setValue(prevState => ++prevState)
  const remove = () => setValue(prevState => --prevState)
  return {add, remove, value}
}

const NewCollection = (props) => {
  
  
  const amountString = useCounter(0)
  const amountNumber = useCounter(0)
  const amountText = useCounter(0)
  const amountBoolean = useCounter(0)
  const amountDate = useCounter(0)
  const name = useInput('')
  const description = useInput('')
  const [topic, setTopic] = useState('topic')
  const [headersInputs, setHeadersInputs] = useState({
    'str': [],
    'num': [],
    'text': [],
    'boolean': [],
    'date': [],
  })
  const handleSaveBtn = () => {
    let headersInp = { // don't delete
      'str': headersInputs['str'],
      'num': headersInputs['num'],
      'text': headersInputs['text'],
      'boolean': headersInputs['boolean'],
      'date': headersInputs['date'],
    }
    let a = false
    for (const key in headersInp) {
      //
      // if (headersInp[key]) continue
      headersInp[key].map(el => {
        el.trim()
        if (!el) a = true
      })
    }
    if (a) return
    let collectionSettings = {
      name: name.value, description: description.value, topic, headersInp
    }
    console.log(collectionSettings)
    props.saveCollectionThunk(collectionSettings, props.token)
  }
  const optionsTopic = props.topics.map((topic, i) => {
    return <option key={i} value={topic}>{topic}</option>
  })
  const handleInput = (e) => {
    setHeadersInputs((prevState) => ({
      ...prevState,
      ...prevState['str'],
      ...prevState['num'],
      ...prevState['text'],
      ...prevState['boolean'],
      ...prevState['date'],
      ...prevState[e.target.dataset.key][e.target.dataset.id] = e.target.value
    }))
  }
  let srtInputs = Array(amountString.value).fill('')
  srtInputs = srtInputs.map((el, i) => <input data-key={'str'} key={i} data-id={i} value={headersInputs['str'][i] || ''}
                                              onChange={handleInput}
                                              type={"text"}/>)
  let numInputs = Array(amountNumber.value).fill('')
  numInputs = numInputs.map((el, i) => <input data-key={'num'} key={i} data-id={i} value={headersInputs['num'][i] || ''}
                                              onChange={handleInput}
                                              type={"text"}/>)
  let textInputs = Array(amountText.value).fill('')
  textInputs = textInputs.map((el, i) => <input data-key={'text'} key={i} data-id={i}
                                                value={headersInputs['text'][i] || ''}
                                                onChange={handleInput}
                                                type={"text"}/>)
  let booleanInputs = Array(amountBoolean.value).fill('')
  booleanInputs = booleanInputs.map((el, i) => <input data-key={'boolean'} key={i} data-id={i}
                                                      value={headersInputs['boolean'][i] || ''}
                                                      onChange={handleInput} type={"text"}/>)
  let dateInputs = Array(amountDate.value).fill('')
  dateInputs = dateInputs.map((el, i) => <input data-key={'date'} data-id={i} key={i}
                                                value={headersInputs['date'][i] || ''}
                                                onChange={handleInput}
                                                type={"text"}/>)
  
  return (
    <div>
      <div className={'d-flex'}>
        <div className={'me-4'}>
          <p>Имя коллекции</p>
          <input type={"text"} {...name.bind}/>
        </div>
        <div className={'me-4'}>
          <p>Описание коллекции</p>
          <textarea {...description.bind}/>
        </div>
        <div className={'me-4'}>
          <p>Тема</p>
          <select onChange={(e) => setTopic(e.target.value)}
                  value={topic}>
            {optionsTopic}
          </select>
        </div>
      </div>
      <div className={'d-flex justify-content-around mb-3 flex-wrap'}>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Строковые поля</p>
          <AmountInputSetting counter={amountString}/>
          {srtInputs}
        </div>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Числовые поля</p>
          <AmountInputSetting counter={amountNumber}/>
          {numInputs}
        </div>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Текстовые поля</p>
          <AmountInputSetting counter={amountText}/>
          {textInputs}
        </div>
        <div className={'d-flex flex-column align-items-center'}>
          <p>Чекбоскы</p>
          <AmountInputSetting counter={amountBoolean}/>
          {booleanInputs}
        </div>
        
        <div className={'d-flex flex-column align-items-center'}>
          <p>Поля дат</p>
          <AmountInputSetting counter={amountDate}/>
          {dateInputs}
        </div>
      </div>
      <button onClick={handleSaveBtn}
              className={'btn btn-success me-2'}>Save
      </button>
    </div>
  )
}

export default NewCollection