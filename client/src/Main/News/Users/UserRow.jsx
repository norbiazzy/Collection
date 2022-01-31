import React from "react";
import {NavLink} from "react-router-dom";

import {editSVG, rightArrowSVG, trashSVG} from "../../../assets/svg/svgExport";
import {compose} from "redux";
import AuthDataHOC from "../../../hoc/AuthDataHOC";

const UserRow = (props) => {
  const {_id, email, role, blocked, collectionsLength, name} = props.user
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>{email}</td>
      <td>{collectionsLength}</td>
      <td>
        <div className="form-check form-switch d-inline-block">
          <input className={"form-check-input"} type="checkbox"
                 id="flexSwitchCheck" disabled={!props.iAdminMod}
                 onChange={(e) => {
                   e.preventDefault()
                 }}
                 onDoubleClick={() => props.toggleRole(_id, role !== 'admin')}
                 defaultChecked={role === 'admin'}/>
        </div>
      </td>
      <td>
        <div className="form-check form-switch d-inline-block">
          <input className="form-check-input" type="checkbox" id="flexSwitchCheck" disabled={!props.iAdminMod}
                 onChange={e => {
                   e.preventDefault()
                 }} defaultChecked={blocked} onDoubleClick={() => props.toggleBlockedUser(_id, !blocked)}/>
        </div>
      </td>
      <td>
        <NavLink to={'/profile/' + _id} className={'btn btn-dark'}>{rightArrowSVG('', 'white', '20px', '20px' )}</NavLink>
      </td>
    </tr>
  )
}

export default compose(AuthDataHOC)(UserRow)