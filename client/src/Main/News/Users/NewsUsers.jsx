import {Col} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const NewsUsers = (props) => {
  const navigate = useNavigate()
  const deleteUser = () => {
    props.delete(props.token, props.user._id)
  }
  const blockUser = () => {
  }
  const linkUser = () => {

    navigate('/profile/'+props.user.profile)
  }
  const roleUser = () => {
  }
  return (
    <tr>
      <td>{props.user.email}</td>
      <td>{props.user.role}</td>
      <td>{props.user.blocked+''}</td>
      <td>
        <button onClick={deleteUser}>delete</button>
        <button onClick={blockUser}>block</button>
        <button onClick={linkUser}>link</button>
        <button onClick={roleUser}>role</button>
      </td>
      <td></td>
    </tr>
  )
}

export default NewsUsers