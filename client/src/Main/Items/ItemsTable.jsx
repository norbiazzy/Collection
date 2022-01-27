import AuthDataHOC from "../../hoc/AuthDataHOC";
import {getItemListSelect} from "../../redux/selectors/item-select";
import {compose} from "redux";
import {connect} from "react-redux";
import ItemRow from "./ItemRow";
import {useCallback, useEffect} from "react";
import CollectionHeader from "../Profile/Collections/CollectionHeader";
import {useParams} from "react-router";

const ItemTable = (props) => {
  const collectionId = useParams().id
  const getItems = useCallback(()=>{
    if(collectionId) getItems
  })
  useEffect(()=>{

  }, getItems, props.token)
  const deleteItem = useCallback((itemId)=>{
    console.log('delete')
  }, [props.token])

  const editItem = useCallback((itemId)=>{
    console.log('edit')
  }, [props.token])

  return (<>
      <h2>Items</h2>
      <table className="table text-center">
        <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Topic</th>
          <th scope="col">Additional information</th>
          <th scope="col">Tools</th>
        </tr>
        </thead>
        <tbody>
        {props.itemList.map(item=><ItemRow item={item} delete={deleteItem} editItem={editItem}/>)}
        </tbody>
      </table>
    </>
  )
}


const mapStateToProps = (state) => ({
  itemList: getItemListSelect(state)
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps),
)(ItemTable)