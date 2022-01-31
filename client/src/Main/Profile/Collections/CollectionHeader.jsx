import React from "react";
import s from '../Priofile.module.css'
import {NavLink, useNavigate} from "react-router-dom";
import {editSVG} from "../../../assets/svg/svgExport";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {compose} from "redux";

const CollectionHeader = (props) => {
  let navigate = useNavigate();
  return (
    <div>
      <div className={'d-flex'}>
        <h2>{props.collection.name}</h2>
        {props.iAdminMod || props.collection.userId === props.iUserId ?
          <button
            onClick={props.openModal}
            className={'btn btn-dark'}>
            {editSVG(s.buttonSVG_big + ' ' + s.svg_white)}
          </button>
          : null}</div>
      <p>Description {props.collection.description}</p>
      <p>Topic: {props.collection.topic.label}</p>
      <NavLink to={'/profile/' + props.collection.userId}>Author</NavLink>
    </div>
  )
}
export default compose(
  AuthDataHOC,
  connect(null, null)
)(CollectionHeader)