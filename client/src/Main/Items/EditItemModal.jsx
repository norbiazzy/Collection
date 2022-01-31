import React from "react";

const EditItemModal = (props) => {
  return (
    <>
      <div onClick={props.closeModal} className={'shadow'}/>
      <div className={'modal'}>
        <div>
          <button onClick={props.closeModal} className={'position-absolute'}>X</button>
          <p>Name</p>
          <input onChange={props.handle} data-input={'name'} value={props.item.name} type={"text"}/>
          <p>Description</p>
          <textarea onChange={props.handle} data-input={'description'} value={props.item.description} />
          <p>Tags</p>
          {props.item.tags.map(tag=><span>{tag} </span>)}
          <div>
            <button onClick={props.save}>Save</button>
            <button onClick={props.closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditItemModal