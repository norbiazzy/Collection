import React from "react";
import s from '../Priofile.module.css'
const Collection = (props) => {
  console.log(props)
  return (
    <div className={s.collection__item} onClick={()=>props.callback(props.id)}>
      <h3>{props.value.name}</h3>
      <p>{props.value.description}</p>
      <p>{props.value.topic}</p>
      <p>{props.value.created}</p>
    </div>
  )
  
  
}

export default Collection