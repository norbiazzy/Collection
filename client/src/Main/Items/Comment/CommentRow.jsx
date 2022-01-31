// import {useCallback, useEffect, useState} from "react"
// import CommentMessage from "./CommentMessage";
// import s from './Items.module.css'
// import Loader from "../all/Loader";
// import AuthDataHOC from "../../hoc/AuthDataHOC";
// import {connect} from "react-redux";
// import {getCommentThunk} from "../../redux/ItemsReducer";
// import {compose} from "redux";
//
// const CommentRow = (props) => {
//   // const [loading, setLoading] = useState(true)
//   //
//   // const getComments = useCallback(async () => {
//   //   await props.getCommentThunk(props.itemId)
//   //   await setLoading(false)
//   // }, [props.itemId])
//   //
//   // useEffect(() => {
//   //     getComments()
//   //   }, [getComments]
//   // )
//   //
//   // if (loading) return (<tr>
//   //   <td style={{height: '100px'}} className={'position-relative'} colSpan={'100%'}><Loader/></td>
//   // </tr>)
//
//
//   let comments = props.comments.map(comment => {
//     return <CommentMessage name={comment.name} message={comment.message}/>
//   })
//   console.log(props.comments)
//   return (
//     <tr>
//       <td colSpan={'100%'}>
//         <div>
//           <div>
//             {comments}
//       {/*    </div>*/}
//       {/*    <div className={'d-flex position-relative'}>*/}
//       {/*      <textarea className={s.messageTextarea} value={props.comment.newCommentText} onChange={props.editComment}/>*/}
//       {/*      <button disabled={!props.comment.newCommentText} className={s.sendComment + ' btn btn-dark'}*/}
//       {/*              onClick={props.addComment}>Send*/}
//       {/*      </button>*/}
//           </div>
//         </div>
//       </td>
//     </tr>
//   )
// }
//
// export default compose(AuthDataHOC, connect(null, {getCommentThunk}))(CommentRow)