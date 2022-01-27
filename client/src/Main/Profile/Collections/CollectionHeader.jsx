import React from "react";
import s from '../Priofile.module.css'
import {useNavigate} from "react-router-dom";

const CollectionHeader = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <h2>name</h2>
      <p>description</p>
    </div>
  )
}
export default CollectionHeader