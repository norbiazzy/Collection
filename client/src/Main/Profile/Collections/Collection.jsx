import React from "react";
import s from '../Priofile.module.css'
import {useNavigate} from "react-router-dom";
const Collection = (props) => {
  let navigate = useNavigate();
  return (
    <div className={s.collection__item} onClick={() => navigate('/items/' + props.id)}>
      <h3>{props.value.name}</h3>
      <p>{props.value.description}</p>
      <p>{props.value.topic}</p>
      <p>{props.value.created}</p>
    </div>
  )
}
export default Collection