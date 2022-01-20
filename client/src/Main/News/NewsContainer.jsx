import {connect} from "react-redux";
import News from "./News";
import {getCollectionsThunk, getItemsThunk, setContentAC} from "../../redux/homeReducer";

const mapStateToProps = (state) => ({
  collections: state.home.collections,
  contentType: state.home.contentType,
  items: state.home.items,
})

const NewsContainer = connect(mapStateToProps, {
  getCollectionsThunk,
  setContentAC,
  getItemsThunk,
})(News)
export default NewsContainer
