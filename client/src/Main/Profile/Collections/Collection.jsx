import React from "react";
import s from '../Priofile.module.css'
import {useNavigate} from "react-router-dom";

const Collection = (props) => {
  let navigate = useNavigate();
  return (
    <div className={s.collection__item}>
      <h3 onClick={() => navigate('/items/' + props.id)}>{props.value.name}</h3>
      <p>{props.value.description}</p>
      <p>{props.value.topic.label}</p>
      <p>{props.value.created}</p>
    </div>
  )
}
export default Collection