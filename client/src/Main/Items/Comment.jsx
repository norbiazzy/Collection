import React, {useCallback, useEffect, useRef, useState} from "react";
import s from './Items.module.css'

const Comment = (props) => {
  return (
    <tr>
      <td colSpan={'100%'}>
        <div>
          <div>
            {props.item.comments}
          </div>
          <div>
            <textarea/>
            <button onClick={()=>{props.addCommentThunk(props.token, )}}>Send</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Comment