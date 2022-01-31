import React, { useState} from "react";
import s from './Items.module.css'
import {compose} from "redux";
import AuthDataHOC from '../../hoc/AuthDataHOC'
import { editSVG,  trashSVG} from "../../assets/svg/svgExport";
// import CommentRow from "./Comment/CommentRow";

const ItemRow = (props) => {
  const {name, _id, description, headers, likes, tags} = props.item
  // const [commentsIsOpen, setCommentsIsOpen] = useState(false)
  
  let spanText = tags.length ? tags.map(t => <span key={t}>{t} </span>) : <span>-</span>
  
  let headersTd = {
    text: [],
    number: [],
    textarea: [],
    checkbox: [],
    date: []
  }
  
  for (const key in headers) {
    for (let i = 0; i < headers[key].length; i++) {
      headersTd[key][i] = <td key={key + i}><p>{headers[key][i]}</p></td>
    }
  }
  
  return (<>
    <tr key={_id}>
      <td><p>{name}</p></td>
      <td><p>{description}</p></td>
      <td><p>{spanText}</p></td>
      {headersTd.text}{headersTd.number}{headersTd.textarea}{headersTd.checkbox}{headersTd.date}
      <td>
        {props.iAdminMod || props.collection.userId === props.iUserId ? <>
          <button className={'btn btn-dark mx-1'} type={'button'}
                  onClick={() => props.delete(_id)}>{trashSVG(s.tollSVG)}</button>
          <button className={'btn btn-dark mx-1'} type={'button'}>{editSVG(s.tollSVG)}</button>
        </> : null}
        <button className={'btn btn-dark mx-1 position-relative'}
                onClick={() => {
                  if (!likes.includes(props.iUserId)) props.likeItem(_id)
                  else props.dislikeItem(_id)
                }} type={'button'}>{likes.length}</button>
        {/*<button className={'btn btn-dark mx-1'}*/}
        {/*        onClick={() => setCommentsIsOpen(prevState => !prevState)}*/}
        {/*        type={'button'}>{commentSVG(s.tollSVG)}</button>*/}
      </td>
    </tr>
    {/*{commentsIsOpen*/}
    {/*  ? <CommentRow itemId={1 + _id}/>*/}
    {/*  : null}*/}
  </>)
}

export default compose(AuthDataHOC)(ItemRow)