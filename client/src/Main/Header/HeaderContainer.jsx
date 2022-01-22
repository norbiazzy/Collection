import {connect} from "react-redux";
import Header from "./Header";
import {loginOutThunk, toggleAdminModAC} from "../../redux/authReducer";

const mapStateToProps = (state) => ({
  token: state.auth.token,
  adminMod : state.auth.adminMod,
  role : state.auth.role,
})

const HeaderContainer = connect(mapStateToProps, {
  loginOutThunk,
  toggleAdminModAC,
})(Header)
export default HeaderContainer
