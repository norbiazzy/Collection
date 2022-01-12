import {connect} from "react-redux";
import Items from "./Items";
import {getCollectionThunk, saveItemThunk} from "../../redux/collectionsReducer";


const mapStateToProps = (state) => ({
  token: state.auth.token,
  collection: state.collection.currentCollection,
  isItems: state.collection.isItems
})

const ItemsContainer = connect(mapStateToProps, {
  getCollectionThunk,
  saveItemThunk
})(Items)

export default ItemsContainer
