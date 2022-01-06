import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../redux/profileReducer";


const mapStateToProps = (state) => ({
    profile: state.profile,
    userId: state.auth.userId
})

const ProfileContainer = connect(mapStateToProps, {
    getProfile
})(Profile)
export default ProfileContainer
