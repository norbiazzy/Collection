import React, {useEffect, useState} from 'react'
import  s from '../../index.css'
import {connect} from "react-redux";
import {
  addCommentThunk,
  deleteItemThunk,
  dislikeItemThunk,
  getCollectionThunk, getCommentThunk,
  likeItemThunk,
  saveItemThunk, saveUpdateItemThunk
} from "../../redux/collectionsReducer";
import Items from "../Items/Items";
const ModalMessage = (props) => {

  const [display, setDisplay] = useState('d-none')
  useEffect(
    setTimeout(()=>{
      setDisplay('d-block')
    },3000)
  )
  return (
    <div className={display + s.modalMessage} >
      <p>props.title</p>
      <p>props.text</p>
    </div>
  )
}

//
// const mapStateToProps = (state) => ({
//   message: state.modal.message,
//   title: state.modal.title,
// })

// const ModalMessageContainer = connect()(mapStateToProps,{

// })

export default ModalMessage