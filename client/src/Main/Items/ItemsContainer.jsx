import {connect} from "react-redux";
import Items from "./Items";



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
