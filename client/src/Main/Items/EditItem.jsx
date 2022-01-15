import React, {useCallback, useEffect, useRef, useState} from "react";
import s from './Items.module.css'

const EditItem = (props) => {
  debugger
  return (
    <>
      <div className={s.shadow}/>
      <div className={s.modal}>
        <div>
          <button className={'position-absolute'}>X</button>
          <p>Name</p>
          <input value={props.item.name} type={"text"}/>
          <p>Description</p>
          <textarea value={props.item.description} />
          <p>Tags</p>
          {props.item.tags.map(tag=><span>{tag} </span>)}
          <div>
            <button>Save</button>
            <button>Cansel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditItem