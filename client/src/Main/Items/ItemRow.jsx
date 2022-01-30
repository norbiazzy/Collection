import React, {useCallback, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import s from './Items.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import AuthDataHOC from '../../hoc/AuthDataHOC'
import {commentSVG, editSVG, heartSVG, rightArrowSVG, trashSVG} from "../../assets/svg/svgExport";
import CommentRow from "./CommentRow";

const ItemRow = (props) => {
  const {name, _id, description, headers, likes, tags} = props.item
  const [commentsIsOpen, setCommentsIsOpen] = useState(false)
  debugger
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
      headersTd[key][i] = <td key={key + i}>{headers[key][i]} </td>
    }
  }

  return (<>
    <tr key={_id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{spanText}</td>
      {headersTd.text} {headersTd.number} {headersTd.textarea} {headersTd.checkbox} {headersTd.date}
      <td>
        <button className={'btn btn-dark mx-1'} type={'button'}
                onClick={() => props.delete(_id)}>{trashSVG(s.tollSVG)}</button>
        <button className={'btn btn-dark mx-1'} type={'button'}>{editSVG(s.tollSVG)}</button>
        <button className={'btn btn-dark mx-1 position-relative'}
                onClick={() => {

                  if (!likes.includes(props.iUserId)) props.likeItem(_id)
                  else props.dislikeItem(_id)
                }}
                type={'button'}>{heartSVG(s.tollSVG)}
          <span style={{color: 'gray'}}
                className={'position-absolute top-50 start-50 translate-middle'}>{likes.length}</span>
        </button>
        <button className={'btn btn-dark mx-1'}
                onClick={() => setCommentsIsOpen(prevState => !prevState)}
                type={'button'}>{commentSVG(s.tollSVG)}</button>
        {/*<NavLink to={'/collection/' + _id} className={'btn btn-dark mx-1'}>{rightArrowSVG(s.tollSVG)}</NavLink>*/}
        {/*<NavLink to={'/collection/'+ collectionId} className={'btn btn-dark mx-1'}>{userSVG(s.tollSVG)}</NavLink>*/}
      </td>
    </tr>
    {commentsIsOpen
      ? <CommentRow itemId={_id}/>
      : null}
  </>)
}
const mapStateToProps = (state => (
{
  // comments: getCommentsSelect(state)
}
))

export default compose(AuthDataHOC, connect(mapStateToProps,
{
}
))(ItemRow)