// import React, {useCallback, useEffect, useState} from "react";
// import Collection from "../Profile/Collections/Collection";
// import NewsItemsTable from "./Items/NewsItemsTable";
// import NewsUsers from "./Users/NewsUsers";
// import Loader from "../all/Loader";
// import {connect} from "react-redux";
// import {
//   deleteUserThunk,
//   getCollectionsThunk,
//   getItemsThunk,
//   setContentAC
// } from "../../redux/homeReducer";
// import {compose} from "redux";
// import AuthDataHOC from "../../hoc/AuthDataHOC";
//
// const News = (props) => {
//   const [loading, setLoading] = useState(true)
//   const getCollections = useCallback(() => {
//     props.getCollectionsThunk()
//       .then(() => setLoading(false))
//   }, [])
//   const getItems = useCallback(() => {
//     props.getItemsThunk()
//       .then(() => setLoading(false))
//   }, [])
//   const getUsers = useCallback(() => {
//     props.getUsersThunk()
//       .then(() => setLoading(false))
//   }, [])
//   let content
//   useEffect(() => {
//     if (props.contentType === 'items') getItems()
//     else if (props.contentType === 'collections') getCollections()
//     else if (props.contentType === 'users') getUsers()
//
//   }, [getCollections, props.contentType])
//
//
//   if (loading) return <Loader/>
//
//   switch (props.contentType) {
//     case 'collections':
//       content = props.collections.map(c => <Collection key={c._id} value={c} id={c._id}/>)
//       break
//     case 'items':
//       content = props.items.map(item => <NewsItemsTable key={item._id} item={item}/>)
//       break
//     case 'users':
//       content = props.users.map(user => <NewsUsers key={user._id} token={props.iToken} delete={props.deleteUsersThunk}
//                                                    user={user}/>)
//       break
//     default:
//       content = 'default type'
//       break
//   }
//   return (
//     <div>
//       <div>
//         <button className={'btn btn-dark me-1'} onClick={() => {
//           props.setContentAC('collections')
//           setLoading(true)
//         }} disabled={props.contentType === 'collections'}>Collections
//         </button>
//         <button className={'btn btn-dark me-1'} onClick={() => {
//           props.setContentAC('items')
//           setLoading(true)
//         }} disabled={props.contentType === 'items'}>Items
//         </button>
//         <button className={'btn btn-dark'} onClick={() => {
//           props.setContentAC('users')
//           setLoading(true)
//         }} disabled={props.contentType === 'users'}>Users
//         </button>
//       </div>
//       <h2>{props.contentType}</h2>
//       {props.contentType === 'users' ? (<table>
//         <thead>
//         <tr>
//           <th>Email</th>
//           <th>Role</th>
//           <th>Blocked</th>
//           <th>Tolls</th>
//         </tr>
//         </thead>
//         <tbody>
//         {content}
//         </tbody>
//       </table>) : content}
//     </div>
//   )
// }
//
//
// const mapStateToProps = (state) => ({
//   collections: state.home.collections,
//   contentType: state.home.contentType,
//   items: state.home.items,
//   users: state.home.users,
//   token: state.auth.token,
// })
//
// export default compose(
//   AuthDataHOC,
//   connect(mapStateToProps, {
//     getCollectionsThunk,
//     setContentAC,
//     getItemsThunk,
//     deleteUserThunk,
//   }),
// )(News)
//
