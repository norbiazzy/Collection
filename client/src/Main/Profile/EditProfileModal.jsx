import {Form} from "react-final-form";
import InputForm from "../../all/InputForm";
import {TextareaForm} from "../../all/TextareaForm";
import s from './Priofile.module.css'
import {compose} from "redux";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {connect} from "react-redux";
import {updateProfileThunk} from "../../redux/uersReducer";

const EditProfileModal = (props) => {
  const onSubmit = (values) => {
    let updates = {...values, userId: props.profile.userId}
    if (!updates.status) updates.status = ' '
    props.updateProfileThunk(props.iToken, updates)
    props.closeModal()
  }
  const required = value => (value ? undefined : true)

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
                <TextareaForm initialValue={props.profile.status} nameText={'Status'} required={required}
                              name={'status'}/>
              </div>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">Photo upload in development</label>
                <input className="form-control" disabled={true} type='file' id="formFile"/>
              </div>
              <div>
                <div className={'mb-2 d-flex justify-content-around'}>
                  <button className={'btn btn-danger ' + s.modalBtn} onClick={() => {
                    props.profile.blocked
                      ? props.unblockUser()
                      : props.blockUser()
                    props.closeModal()
                  }}>{props.profile.blocked ? 'Unblock' : 'Block'}
                  </button>
                  <button className={'btn btn-danger ' + s.modalBtn} onClick={() => {
                    props.deleteUser()
                    props.closeModal()
                  }}>Delete
                  </button>
                </div>
                <div className={'d-flex justify-content-around'}>
                  <button className={'btn btn-success ' + s.modalBtn} type={'submit'}>Update</button>
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

export default compose(
  AuthDataHOC,
  connect(null, {
    updateProfileThunk
  })
)(EditProfileModal)