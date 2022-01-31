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
  const {_id, name, description, itemsLength, topic, email, created, userId} = props.collection
  
  return (
    <tr>
      <td scope="col"><NavLink to={'/items' + _id}>{name}</NavLink></td>
      <td scope="col">{description}</td>
      <td scope="col">{topic}</td>
      <td scope="col">{itemsLength}</td>
      <td scope="col"><NavLink to={'/profile/' + userId}>{email}</NavLink></td>
      <td scope="col">{created}</td>
    </tr>
  )
}
const mapStateToProps = (state) => (
  {
    // itemList: getItemListSelect(state),
    // comments: getCommentsSelect(state),
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