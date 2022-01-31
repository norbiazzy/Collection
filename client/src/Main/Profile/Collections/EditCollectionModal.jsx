import React from "react";
import {Field, Form} from "react-final-form";
import {compose} from "redux";
import {connect} from "react-redux";
import ReactSelectAdapter from "../../../all/ReactSelectAdapter";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {TextareaForm} from "../../../all/TextareaForm";
import InputForm from "../../../all/InputForm";
import {getTopicsSelect} from "../../../redux/selectors/collection-select";
import s from '../Priofile.module.css'
import {updateCollectionThunk} from "../../../redux/collectionsReducer";

const EditCollectionModal = (props) => {
  const onSubmit = (values) => {

    let updates = {...values, collectionId: props.collection._id}

    if (!updates.description) updates.description = ' '
    props.updateCollectionThunk(props.iToken, updates)
    props.close()
  }
  const required = value => (value ? undefined : true)

  return (
    <>
      <div onClick={props.close} className={'shadow'}/>
      <div className={'customModal'}>
        <Form
          onSubmit={onSubmit}
          validate={required}
          render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <h2>Collection Editor</h2>
              <div>
                <InputForm initialValue={props.collection.name} nameText={'Name'} name={"name"} type={"text"}
                           required={required}/>
              </div>
              <div>
                <TextareaForm initialValue={props.collection.description} nameText={'Description'}
                              name={'description'}/>
              </div>
              <div className={'mb-2'}>
                <Field
                  name="topic"
                  options={props.topics}
                  component={ReactSelectAdapter}
                  defaultValue={props.collection.topic}
                />
              </div>
              <div className={'d-flex justify-content-around'}>
                <button className={'btn btn-success ' + s.modalBtn} type={'submit'}>Update</button>
                <button className={'btn btn-warning ' + s.modalBtn} type={'button'} onClick={props.close}>Cancel
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  topics: getTopicsSelect(state)
})

export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {updateCollectionThunk})
)(EditCollectionModal)