import AuthDataHOC from "../../hoc/AuthDataHOC";
import {getCommentsSelect, getItemListSelect} from "../../redux/selectors/item-select";
import {compose} from "redux";
import {connect} from "react-redux";
import ItemRow from "./ItemRow";
import {useCallback, useState} from "react";
import {deleteItemThunk, dislikeItemThunk, getCollectionItemsThunk, likeItemThunk} from "../../redux/ItemsReducer";
import {getCollectionSelect} from "../../redux/selectors/collection-select";

const ItemTable = (props) => {
  // const collectionId = useParams().id
  // const getItems = useCallback(() => {
  //   if (collectionId) props.getCollectionItemsThunk()
  // }, props.iToken)
  // useEffect(() => {
  //   getItems()
  // }, [getItems])
  const deleteItem = useCallback((itemId) => {

    props.deleteItemThunk(props.iToken, itemId)
  }, [props.iToken])

  const editItem = useCallback((itemId) => {
    console.log('edit')
  }, [props.iToken])

  const likeItem = useCallback((itemId) => {
    props.likeItemThunk(props.iToken, itemId)
  }, [props.iToken])
  const dislikeItem = useCallback((itemId) => {
    props.dislikeItemThunk(props.iToken, itemId)
  }, [props.iToken])
  let headersTh = {
    text: [],
    number: [],
    textarea: [],
    checkbox: [],
    date: []
  }
  for (const key in props.collection.headers) {
    for (let i = 0; i < props.collection.headers[key].length; i++) {
      headersTh[key][i] = <th key={i}>{props.collection.headers[key][i].header}</th>
    }
  }

  return (<>
      <table className="table text-center">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Tags</th>
          {headersTh.text}
          {headersTh.number}
          {headersTh.textarea}
          {headersTh.checkbox}
          {headersTh.date}
          <th scope="col">Tools</th>
        </tr>
        </thead>
        <tbody>
        {props.itemList.map(item => <ItemRow key={item._id}
                                             item={item}
                                             likeItem={likeItem}
                                             dislikeItem={dislikeItem}
                                             collection={props.collection}
                                             delete={deleteItem}
                                             editItem={editItem}/>)}
        </tbody>
      </table>
    </>
  )
}


const mapStateToProps = (state) => ({
  itemList: getItemListSelect(state),
  collection: getCollectionSelect(state),
  comments: getCommentsSelect(state)
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {getCollectionItemsThunk, deleteItemThunk, likeItemThunk, dislikeItemThunk})
)(ItemTable)