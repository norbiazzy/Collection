import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profileReducer";
import {saveCollectionThunk} from "../../redux/collectionsReducer";


const mapStateToProps = (state) => ({
    profile: state.profile,
    userId: state.auth.userId,
    new_collection: state.collection.new_collection,
    topics: state.collection.topics,
    maxAmountInputs: state.collection.maxAmountInputs
    
})

const ProfileContainer = connect(mapStateToProps, {
    getProfile,
    saveCollectionThunk,
})(Profile)
export default ProfileContainer
