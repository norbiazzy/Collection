import NewItemForm from "./CreateItemForm";
import React, {useCallback, useEffect, useState} from "react";
import {connect} from "react-redux";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {useParams} from "react-router";
import {getCollectionItemsThunk} from "../../redux/ItemsReducer";
import {getCollectionSelect} from "../../redux/selectors/collection-select";
import {getItemListSelect} from "../../redux/selectors/item-select";
import Loader from "../../all/Loader";
import CollectionHeader from "../Profile/Collections/CollectionHeader";
import EditCollectionModal from "../Profile/Collections/EditCollectionModal";
import ItemsTable from "./ItemsTable";

const ItemsPage = (props) => {
  const [createMod, setCreateMod] = useState(false)
  const [editCollectionMod, setEditCollectionMod] = useState(false)
  // const [editItemMod, setEditItemMod] = useState(false)
  const [loading, setLoading] = useState(true)
  let submit
  let setSubmit = (e) => {
    submit = e
  }

  const collectionId = useParams().id

  const getItems = useCallback(async () => {
    if (collectionId) await props.getCollectionItemsThunk(props.iToken, collectionId)
    setLoading(false)
  }, [props.iToken, collectionId])

  useEffect(() => {
    getItems()
  }, [getItems])

  if (loading) return <Loader/>

  return (
    <>
      {editCollectionMod
        ? <EditCollectionModal close={() => setEditCollectionMod(false)} collection={props.collection}/>
        : null}
      {/*{editItemMod*/}
      {/*  ? <EditCollectionModal close={() => setEditItemMod(false)} collection={props.collection}/>*/}
      {/*  : null}*/}
      <CollectionHeader openModal={() => setEditCollectionMod(true)} collection={props.collection}/>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Items</h2>
        {props.iAdminMod || props.collection.userId === props.iUserId ? <div>
          {createMod ? <button className={'btn btn-success me-2'}
                               onClick={event => submit(event)}
          >Create
          </button> : null}
          <button className={'btn ' + (createMod ? 'btn-danger' : 'btn-dark')}
                  onClick={() => {
                    if (!createMod) console.log('push!!!')
                    setCreateMod((p) => !p)
                  }}>{createMod ? 'Close' : 'Create new item'}
          </button>
        </div> : null}
      </div>
      <div>
      {createMod ? <NewItemForm collectionId={props.collection._id} setSubmit={setSubmit}
                                headers={props.collection.headers}/> : null}
        <ItemsTable />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  collection: getCollectionSelect(state),
  itemList: getItemListSelect(state)
})

export default compose(
  AuthDataHOC,
  connect(mapStateToProps,
    {
      getCollectionItemsThunk
    }
  )
)(ItemsPage)