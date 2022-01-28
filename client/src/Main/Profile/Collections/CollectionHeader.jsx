import React from "react";
import s from '../Priofile.module.css'
import {NavLink, useNavigate} from "react-router-dom";

const CollectionHeader = ({collection}) => {
  let navigate = useNavigate();
  return (
    <div>
      <h2>{collection.name}</h2>
      <p>{collection.description}</p>
      <NavLink to={'/profile/'+ collection.userId}>Author</NavLink>
    </div>
  )
}
export default CollectionHeader