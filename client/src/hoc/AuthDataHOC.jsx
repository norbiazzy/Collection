import {getAdminMod, getRole, getUserId, getToken, getBlocked} from "../redux/selectors/user-select"
import {connect} from 'react-redux'

const AuthDataHOC = (Component) => (props) => {
    let mapStateToProps = state => ({
    iToken: getToken(state),
    iUserId: getUserId(state),
    iRole: getRole(state),
    iBlocked: getBlocked(state),
    iAdminMod: getAdminMod(state),
  })
  let ComponentConnected = connect(mapStateToProps, )(Component)
  return <ComponentConnected {...props}/>
}

export default AuthDataHOC