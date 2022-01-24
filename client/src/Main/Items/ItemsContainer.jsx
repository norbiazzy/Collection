import {connect} from "react-redux";
import Items from "./Items";
import {
  addCommentThunk,
  deleteItemThunk,
  dislikeItemThunk,
  getCollectionThunk, getCommentThunk,
  likeItemThunk,
  saveItemThunk,
  saveUpdateItemThunk
} from "../../redux/collectionsReducer";


const mapStateToProps = (state) => ({
  token: state.auth.token,
  collection: state.collection.currentCollection,
  isItems: state.collection.isItems,
  items: state.collection.items,
  userId: state.auth.userId,
  comments: state.collection.comments,
})

const ItemsContainer = connect(mapStateToProps, {
  getCollectionThunk,
  saveItemThunk,
  deleteItemThunk,
  likeItemThunk,
  dislikeItemThunk,
  saveUpdateItemThunk,
  addCommentThunk,
  getCommentThunk,
})(Items)

export default ItemsContainer
