import {getAdminMod, getRole, getUserId, getToken} from "../redux/selectors/user-select"
import {connect} from 'react-redux'

const AuthDataHOC = (Component) => (props) => {

  let mapStateToProps = state => ({
    token: getToken(state),
    userId: getUserId(state),
    role: getRole(state),
    adminMod: getAdminMod(state)
  })

  let ComponentConnected = connect(mapStateToProps)(Component)
  return <ComponentConnected {...props}/>

}

export default AuthDataHOC