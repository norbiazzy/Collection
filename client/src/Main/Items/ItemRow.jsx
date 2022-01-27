import React from "react";
import {NavLink} from "react-router-dom";
import s from './Items.module.css'
import {compose} from "redux";
import AuthDataHOC from '../../hoc/AuthDataHOC'
import {editSVG, rightArrowSVG, trashSVG} from "../../assets/svg/svgExport";

const Collection = (props) => {
  const {_id, name, description, topic} = props.collection
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{topic.label}</td>
      <td>Fields</td>
      <td>
        <button className={'btn btn-dark mx-1'}>{trashSVG(s.tollSVG)}</button>
        <button className={'btn btn-dark mx-1'}>{editSVG(s.tollSVG)}</button>
        <NavLink to={'/profile/' + _id} className={'btn btn-dark mx-1'}>{rightArrowSVG(s.tollSVG)}</NavLink>
        {/*<NavLink to={'/collection/'+ collectionId} className={'btn btn-dark mx-1'}>{userSVG(s.tollSVG)}</NavLink>*/}
      </td>
    </tr>
  )
}

export default compose(AuthDataHOC)(Collection)