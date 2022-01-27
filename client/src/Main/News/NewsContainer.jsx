import {connect} from "react-redux";
import News from "./News";
import {
  deleteUserThunk,
  getCollectionsThunk,
  getItemsThunk,
  getUsersThunk,
  setContentAC
} from "../../redux/homeReducer";

const mapStateToProps = (state) => ({
  collections: state.home.collections,
  contentType: state.home.contentType,
  items: state.home.items,
  users: state.home.users,
  token: state.auth.token,
})

const NewsContainer = connect(mapStateToProps, {
  getCollectionsThunk,
  setContentAC,
  getItemsThunk,
  getUsersThunk,
  deleteUserThunk,
})(News)
export default NewsContainer
