import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import ItemsForm from "./ItemsForm";
import s from './Items.module.css'
import {commentSVG, editSVG, heartSVG, trashSVG} from "../../assets/svg/svgExport";
import EditItem from "./EditItem";
import Comment from "./Comment";
import {loginAC} from "../../redux/authReducer";
import Loader from "../all/Loader";


// const useComments = (initialValue = false) => {
//   let [value, setValue] = useState(initialValue)
//
//   return {add, remove, value}
// }

const Items = (props) => {
  let [loading, setLoading] = useState(true)
  let [createMod, setCreateMod] = useState(false)
  let [currentComments, setCurrentComments] = useState(false)
  let [editMod, setEditMod] = useState(false)
  const handleEditItem = useCallback((e) => {
    setEditMod(prevState => ({
      ...prevState,
      [e.target.dataset.input]: e.target.value
    }))
  })
  let collectionId = useParams().id
  let getCollection = useCallback(() => {
    props.getCollectionThunk(props.token, collectionId)
      .then(() => setLoading(false))
  }, [collectionId])

  useEffect(() => {
    getCollection()
  }, [getCollection])
  const deleteItem = (e) => {
    props.deleteItemThunk(props.token, e.target.dataset.id)
  }
  const likeItem = (e) => {

    props.likeItemThunk(props.token, e.currentTarget.dataset.id, e.currentTarget.dataset.index)
  }
  const dislikeItem = (e) => {
    props.dislikeItemThunk(props.token, e.currentTarget.dataset.id, e.currentTarget.dataset.index)
  }
  const saveUpdateItem = (e) => {
    props.saveUpdateItemThunk(props.token, editMod)
      .then(res => {
        setEditMod(false)
        console.log(res)
      })
  }
  const openEditModal = (e) => {
    setEditMod(props.items.filter(el => el._id === e.currentTarget.dataset.id)[0])
  }
  const addComment = () => {
    props.addCommentThunk(props.token, {
      message: currentComments.newCommentText,
      itemId: currentComments.id
    })
  }
  const closeComments = () => {
    setCurrentComments(false)
  }
  const openComments = (e) => {
    setCurrentComments({
      comments: props.items[e.target.dataset.index].comments,
      newCommentText: null,
      id: e.target.dataset.id
    })
    props.getCommentThunk(e.target.dataset.id)
  }
  const editComment = (e) => {
    setCurrentComments(prevState => ({
      ...prevState,
      newCommentText: e.target.value
    }))
  }

  if (loading) return <Loader/>
  //
  let headers = []
  for (const collectionKey in props.collection.headersInp) {
    // eslint-disable-next-line no-loop-func
    props.collection.headersInp[collectionKey].map((el) => {
      headers = [...headers, <th key={headers.length}>{el}</th>]
    })
  }

  let items = props.items.map((item, i) => {
    let bodyInp = []
    for (const key in item.bodyInputs) {
      // eslint-disable-next-line no-loop-func
      item.bodyInputs[key].map((el) => {
        bodyInp = [...bodyInp, <td key={bodyInp.length}>{el}</td>]
      })
    }
    let tags = item.tags.map((el, i) => {
      return <span key={i}>{el} </span>
    })
    let isLiked = item.likes.includes(props.userId)
    return (
      <>
        <tr key={item._id}>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td>{tags}</td>
          {bodyInp}
          <td>
            <button data-id={item._id} data-index={i} onClick={deleteItem}>{trashSVG()}</button>
            <button data-id={item._id} data-index={i}
                    onClick={currentComments && currentComments.id === item._id ? closeComments : openComments}>{commentSVG()}</button>
            <button data-id={item._id}
                    data-index={i}
                    onClick={isLiked ? dislikeItem : likeItem}>{heartSVG(isLiked ? 'yes' : 'no')}<span>{item.likes.length}</span>
            </button>
            <button data-id={item._id}
                    data-index={i}
                    onClick={openEditModal}>{editSVG()}</button>
          </td>
        </tr>
        {currentComments && currentComments.id === item._id ?
          <Comment comments={props.comments} comment={currentComments} editComment={editComment} addComment={addComment}/> : null}
      </>
    )
  })
  return (
    <>
      {editMod ? <EditItem save={saveUpdateItem} handle={handleEditItem} closeModal={() => setEditMod(false)}
                           item={editMod}/> : null}
      <div>
        <h2>{props.collection.name}</h2>
        <p>{props.collection.description}</p>
        <p>{props.collection.created}</p>
        <p>{props.collection.topic}</p>
        <button onClick={() => setCreateMod(prevState => !prevState)}>{createMod ? 'Close' : 'Create new item'}</button>
        {createMod ? <ItemsForm token={props.token} saveItemThunk={props.saveItemThunk} collectionId={collectionId}
                                headersInp={props.collection.headersInp}/> : null}

        {/*{items}*/}
        <table>
          <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Tags</th>
            {headers}
            <th>Tools</th>
            {/*<th>Date Created</th>*/}
          </tr>
          </thead>
          <tbody>
          {items}

          </tbody>
        </table>
      </div>
    </>)
}

export default Items