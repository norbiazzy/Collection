import {useNavigate} from "react-router";
import {useCallback, useEffect, useState} from "react";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {compose} from "redux";
import {connect} from "react-redux";
import Loader from "../../all/Loader";
import {dislikeItemThunk, getCommentThunk, getItemListThunk, likeItemThunk} from "../../../redux/ItemsReducer";
import {getCommentsSelect, getItemListSelect} from "../../../redux/selectors/item-select";
import {NavLink} from "react-router-dom";
import {heartSVG} from "../../../assets/svg/svgExport";
import CommentRow from "../../Items/CommentRow";

const NewsItemRow = (props) => {
  const [comment, setComment] = useState(false)
  const [commentLoading, setCommentLoading] = useState(false)
  const {name, description, _id, topic, likes, email, userId, collectionId, collectionName} = props.item
  
  return (<>
    <tr>
      <td scope="col">{name}</td>
      <td scope="col">{description}</td>
      <td scope="col">{topic}</td>
      <td scope="col"><NavLink to={'/items/' + collectionId}> {collectionName}</NavLink></td>
      <td scope="col"><NavLink to={'/profile/' + userId}>{email}</NavLink></td>
      <td scope="col">
        <button onClick={() => {
          if (likes.includes(props.iUserId)) props.dislikeItemThunk(props.iToken, _id)
          else props.likeItemThunk(props.iToken, _id)
        }
        } className={'btn btn-dark'}>{likes.length}</button>
      </td>
      <td scope="col" onMouseEnter={() => {
        if (!commentLoading) props.getCommentThunk(_id)
        setCommentLoading(true)
      }}
          onClick={() => {
            setComment(prevState => !prevState)
          }}>Comments
      </td>
    </tr>
    {comment ? <CommentRow comments={props.comments[_id]}/> : null}
  </>)
}
const mapStateToProps = (state) => (
  {
    itemList: getItemListSelect(state),
    comments: getCommentsSelect(state),
  }
)
export default compose(AuthDataHOC, connect(mapStateToProps,
  {
    getItemListThunk,
    likeItemThunk,
    dislikeItemThunk,
    getCommentThunk
  }
))(NewsItemRow)