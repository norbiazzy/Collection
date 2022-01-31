import React, {useCallback, useEffect, useState} from "react";
import {getUserListSelect} from "../../../redux/selectors/user-select";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {compose} from "redux";
import {
  blockUserThunk,
  getUserListThunk,
  setAdminRoleThunk,
  setUserRoleThunk,
  unblockUserThunk
} from "../../../redux/uersReducer";
import Loader from "../../../all/Loader";
import UserRow from "./UserRow";
import useSortableData from "../../../hooks/useSortableData";

const NewsUsers = (props) => {
  const [loading, setLoading] = useState(true)
  const {items, requestSort, sortConfig} = useSortableData(props.userList);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  const getUserList = useCallback(async () => {
    await props.getUserListThunk()
    setLoading(false)
  }, [props.iToken])
  
  useEffect(() => getUserList(), [getUserList])
  
  if (loading) return <Loader/>
  
  const toggleBlockedUser = (userId, data) => {
    data ? props.blockUserThunk(props.iToken, userId) : props.unblockUserThunk(props.iToken, userId)
  }
  const toggleRole = (userId, data) => {
    data ? props.setAdminRoleThunk(props.iToken, userId) : props.setUserRoleThunk(props.iToken, userId)
  }
  return (<>
    <h2>Users</h2>
    <table className="table text-center">
      <thead>
      <tr>
        <th scope="col" className={getClassNamesFor('name')} onClick={()=>requestSort('name')}>Name</th>
        <th scope="col" className={getClassNamesFor('email')} onClick={()=>requestSort('email')}>Email</th>
        <th scope="col" className={getClassNamesFor('collectionsLength')} onClick={()=>requestSort('collectionsLength')}>Collections</th>
        <th scope="col" className={getClassNamesFor('role')} onClick={()=>requestSort('role')}>Admin</th>
        <th scope="col" className={getClassNamesFor('blocked')} onClick={()=>requestSort('blocked')}>Blocked</th>
        <th scope="col">Tools</th>
      </tr>
      </thead>
      <tbody>
      {items.map(user => <UserRow key={user._id} toggleRole={toggleRole} toggleBlockedUser={toggleBlockedUser}
                                           user={user}/>)}
      </tbody>
    </table>
  </>)
}
const mapStateToProps = (state) => ({
  userList: getUserListSelect(state)
})
export default compose(AuthDataHOC, connect(mapStateToProps, {
  getUserListThunk,
  blockUserThunk,
  unblockUserThunk,
  setUserRoleThunk,
  setAdminRoleThunk
}))(NewsUsers)