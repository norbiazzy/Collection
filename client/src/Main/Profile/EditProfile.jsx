import React, {useCallback, useEffect, useRef, useState} from "react";
import {Field, Form} from "react-final-form";
import InputForm from "../../Sing/SingForm/InputForm";
import {TextareaForm} from "../all/TextareaForm";
import s from './Priofile.module.css'

const EditProfile = (props) => {
  const onSubmit = (values) => {
    console.log(values, 'submit')
  }
  const required = (values) => {
    console.log(values, 'required')
  }

  return (
    <>
      <div onClick={props.closeModal} className={'shadow'}/>
      <div className={'customModal'}>
        <Form
          onSubmit={onSubmit}
          validate={required}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <div>
                <InputForm initialValue={props.profile.name} nameText={'Username'} name={"name"} type={"text"}
                           required={required}/>
              </div>
              <div>
                <TextareaForm initialValue={props.profile.status} nameText={'Status'} name={'status'}/>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Photo upload in development</label>
                <input className="form-control" disabled={true} type='file' id="formFile"/>
              </div>
              <div className={''}>
                <div className={'mb-2 d-flex justify-content-around'}>
                  <button className={'btn btn-danger ' + s.modalBtn} onClick={()=> {
                    props.blockUser()
                    props.closeModal()
                  }}>Block</button>
                  <button className={'btn btn-danger ' + s.modalBtn} onClick={()=> {
                    props.deleteUser()
                    props.closeModal()
                  }}>Delete</button>
                </div>
                <div className={'d-flex justify-content-around'}>
                  <button className={'btn btn-success ' + s.modalBtn} onClick={props.closeModal}>Update</button>
                  <button className={'btn btn-warning ' + s.modalBtn} onClick={props.closeModal}>Cancel</button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </>
  )
}

export default EditProfile