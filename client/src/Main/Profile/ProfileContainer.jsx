import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunk} from "../../redux/profileReducer";
import {deleteCollectionThunk, saveCollectionThunk} from "../../redux/collectionsReducer";
import {deleteUserThunk} from "../../redux/homeReducer";

const mapStateToProps = (state) => ({
  // profile: state.profile,
  // userId: state.auth.userId,
  // adminMod: state.auth.adminMod,
  // token: state.auth.token,
  // topics: state.collection.topics,
  // maxAmountInputs: state.collection.maxAmountInputs
})
const ProfileContainer = connect(mapStateToProps, {
  getProfileThunk,
  saveCollectionThunk,
  deleteUserThunk,
  deleteCollectionThunk,
})(Profile)
export default ProfileContainer
