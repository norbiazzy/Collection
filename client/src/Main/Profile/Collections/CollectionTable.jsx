import React, {useCallback} from "react";
import s from '../Priofile.module.css'
import {useNavigate} from "react-router-dom";
import CollectionRow from "./CollectionRow";
import {getProfile} from "../../../redux/selectors/user-select";
import {getCollectionListSelect} from "../../../redux/selectors/collection-select";
import {compose} from "redux";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {deleteUserThunk, getProfileThunk} from "../../../redux/uersReducer";
import {deleteCollectionThunk} from "../../../redux/collectionsReducer";

const CollectionTable = (props) => {

  const deleteCollection = useCallback((collectionId) => {
    props.deleteCollectionThunk(props.token, collectionId)
  }, [props.token])

  return (
    <table className="table text-center">
      <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Description</th>
        <th scope="col">Date Create</th>
        <th scope="col">Topic</th>
        <th scope="col">Size</th>
        <th scope="col">Tools</th>
      </tr>
      </thead>
      <tbody>
      {props.collectionList.map(collection => <CollectionRow deleteCollection={deleteCollection}
                                                                    collection={collection}/>)}
      </tbody>
    </table>
  )
}


const mapStateToProps = (state) => ({
  collectionList: getCollectionListSelect(state)
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {deleteCollectionThunk}),
)(CollectionTable)