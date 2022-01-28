import NewItemForm from "./NewItemForm";
import React, {useCallback, useDebugValue, useEffect, useState} from "react";
import {connect} from "react-redux";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {useParams} from "react-router";
import {getCollectionItemsThunk} from "../../redux/ItemsReducer";
import {getCollection, getCollectionSelect} from "../../redux/selectors/collection-select";
import {getItemListSelect} from "../../redux/selectors/item-select";
import Loader from "../all/Loader";
import CollectionHeader from "../Profile/Collections/CollectionHeader";
import ItemAdditionalInputs from "./ItemAdditionalInputs";
import NewItemFormArr from "./NewItemFormArr";

const ItemsPage = (props) => {
  const [createMod, setCreateMod] = useState(false)
  const [loading, setLoading] = useState(true)
  let submit
  let setSubmit = (e) => {
    submit = e
  }
  const collectionId = useParams().id
  const getItems = useCallback(async () => {
    if (collectionId) await props.getCollectionItemsThunk(props.token, collectionId)
    setLoading(false)
  }, [props.token, collectionId])
  useEffect(() => {
    getItems()
  }, [getItems])
  
  if (loading) return <Loader/>
  
  return (
    <>
      <CollectionHeader collection={props.collection}/>
      <div className='d-flex justify-content-between align-items-center'>
        <h2>Collections</h2>
        {props.adminMod || props.collection.userId === props.userId ? <div>
          {createMod ? <button className={'btn btn-success me-2'}
                               onClick={event => submit(event)}
          >Create
          </button> : null}
          <button className={'btn ' + (createMod ? 'btn-danger' : 'btn-dark')}
                  onClick={() => setCreateMod((p) => !p)}>{createMod ? 'Close' : 'Create new Collection'}
          </button>
        </div> : null}
      </div>
      {/*<div>*/}
      {/*  <h2>Collection Info</h2>*/}
      {createMod ? <NewItemFormArr setSubmit={setSubmit} headers={props.collection.headers}/> : null}
      {/*  <h2> ? Create Item - props.collection</h2>*/}
      {/*  <h2>Items table header -> Items Row</h2>*/}
      
      {/*</div>*/}
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