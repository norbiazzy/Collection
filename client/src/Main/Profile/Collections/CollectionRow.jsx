import React from "react";
import s from './Collection.module.css'
import {NavLink} from "react-router-dom";

import {editSVG, rightArrowSVG, trashSVG} from "../../../assets/svg/svgExport";
import {compose} from "redux";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {deleteCollectionThunk} from "../../../redux/collectionsReducer";

const Collection = (props) => {
  const {_id, name, description, created, topic, items} = props.collection
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{created}</td>
      <td>{topic.label}</td>
      <td>{items.length}</td>
      <td>
        <button onClick={() => props.deleteCollection(_id)}
                className={'btn btn-dark mx-1'}>{trashSVG(s.tollSVG)}</button>
        <button className={'btn btn-dark mx-1'}>{editSVG(s.tollSVG)}</button>
        <NavLink to={'/items/' + _id} className={'btn btn-dark mx-1'}>{rightArrowSVG(s.tollSVG)}</NavLink>
        {/*<NavLink to={'/profile/'+ userId} className={'btn btn-dark mx-1'}>{userSVG(s.tollSVG)}</NavLink>*/}
      </td>
    </tr>
  )
}

export default compose(AuthDataHOC)(Collection)