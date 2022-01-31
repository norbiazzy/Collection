import {Col} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const NewsUsers = (props) => {
  const navigate = useNavigate()
  
  return (
    <tr>
      <td>{props.user.email}</td>
      <td>{props.user.collections.length}</td>
      <td>{props.user.role}</td>
      <td>{props.user.role}</td>
      <td>{props.user.blocked + ''}</td>
      <td>
        <button>delete</button>
        <button>block</button>
        <button>link</button>
        <button>role</button>
      </td>
      <td></td>
    </tr>
  )
}

export default NewsUsers