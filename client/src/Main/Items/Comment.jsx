import {useState} from "react"
import CommentMessage from "./CommentMessage";
import s from './Items.module.css'

const Comment = (props) => {
  let comments = props.comments.map(comment => {
    return <CommentMessage name={comment.name} message={comment.message}/>
  })
  return (
    <tr>
      <td colSpan={'100%'}>
        <div>
          <div>
            {comments}
          </div>
          <div className={'d-flex position-relative'}>
            <textarea className={s.messageTextarea} value={props.comment.newCommentText} onChange={props.editComment}/>
            <button disabled={!props.comment.newCommentText} className={s.sendComment + ' btn btn-dark'}
                    onClick={props.addComment}>Send
            </button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Comment