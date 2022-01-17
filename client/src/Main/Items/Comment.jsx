import { useState } from "react"

const Comment = (props) => {
  return (
    <tr>
      <td colSpan={'100%'}>
        <div>
          <div>
            {}
          </div>
          <div>
            <textarea value={props.comment.newCommnetText} onChange={props.editComment}/>
            <button onClick={props.addCommentThunk}>Send</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Comment