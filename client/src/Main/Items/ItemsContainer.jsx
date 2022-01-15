import {connect} from "react-redux";
import Items from "./Items";
import {
  deleteItemThunk,
  dislikeItemThunk,
  getCollectionThunk,
  likeItemThunk,
  saveItemThunk, saveUpdateItemThunk
} from "../../redux/collectionsReducer";


const mapStateToProps = (state) => ({
  token: state.auth.token,
  collection: state.collection.currentCollection,
  isItems: state.collection.isItems,
  items: state.collection.items
})

const ItemsContainer = connect(mapStateToProps, {
  getCollectionThunk,
  saveItemThunk,
  deleteItemThunk,
  likeItemThunk,
  dislikeItemThunk,
  saveUpdateItemThunk,
})(Items)

export default ItemsContainer
