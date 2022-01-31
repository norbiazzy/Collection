import React, {useCallback, useEffect, useState} from "react";
import s from './Priofile.module.css'
import {NavLink, useParams} from "react-router-dom";
import NewCollectionForm from "./Collections/NewCollectionForm";
import {useNavigate} from "react-router";
import EditProfile from "./EditProfile";
import CollectionTable from "./Collections/CollectionTable";
import {connect} from "react-redux";
import {deleteCollectionThunk, saveCollectionThunk} from "../../redux/collectionsReducer2";
import {getProfile} from "../../redux/selectors/user-select";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {blockUserThunk, deleteUserThunk, getProfileThunk, unblockUserThunk} from "../../redux/uersReducer";
import Loader from "../all/Loader";
import {editSVG} from "../../assets/svg/svgExport";
import NewCollectionFormArr from "./Collections/NewCollectionFormArr";


let Profile = (props) => {
  const [loading, setLoading] = useState(true)
  const [createMod, setCreateMod] = useState(false)
  const [editProfileMod, setEditProfileMod] = useState(false)
  const [errorPage, setErrorPage] = useState(false)
  const userId = useParams().id
  const navigate = useNavigate()
  let submit
  let setSubmit = (e) => {
    submit = e
  }
  const getProfile = useCallback(async () => {
    if (!props.iToken) return navigate('/news/collection')
    let res = await props.getProfileThunk(props.iToken, userId)
    setLoading(false)
    setErrorPage(!res)
  }, [props.iToken, userId])

  useEffect(() => getProfile(), [getProfile])

  const toggleMod = (value) => value(prevState => !prevState)

  if (loading) return <Loader/>
  if (errorPage) navigate('/error')

  const deleteUser = async () => {
    let res = await props.deleteUserThunk(props.iToken, props.profile.userId)
    if (res) navigate('/error')
  }
  const blockUser = async () => {
    props.blockUserThunk(props.iToken, props.profile.userId)
  }
  const unblockUser = async () => {
    props.unblockUserThunk(props.iToken, props.profile.userId)
  }
  return (
    <>
      {editProfileMod
        ? <EditProfile deleteUser={deleteUser} blockUser={blockUser} unblockUser={unblockUser} profile={props.profile}
                       closeModal={() => toggleMod(setEditProfileMod)}/>
        : null}
      <div className={'d-flex'}>
        <h2>Profile</h2>
        {props.iAdminMod || props.profile.userId === props.iUserId ?
          <button
            onClick={() => toggleMod(setEditProfileMod)}
            className={'btn btn-dark'}>
            {editSVG(s.buttonSVG_big + ' ' + s.svg_white)}
          </button> : null}
      </div>
      <div className={`d-flex`}>
        <div>
          <img className={s.img} src={props.profile.photo} alt={'profile'}/>
        </div>
        <div>
          <p>Username: {props.profile.name}</p>
          <p>Status: {props.profile.status}</p>
          <p>Role: {props.profile.role}</p>
          <p>is blocked: {props.profile.blocked + ''}</p>
        </div>
      </div>
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h2>Collections</h2>
          {props.iAdminMod || props.profile.userId === props.iUserId ? <div>
            {createMod ? <button className={'btn btn-success me-2'}
                                 onClick={event => submit(event)}>Create
            </button> : null}
            <button className={'btn ' + (createMod ? 'btn-danger' : 'btn-dark')}
                    onClick={() => toggleMod(setCreateMod)}>{createMod ? 'Close' : 'Create new Collection'}
            </button>
          </div> : null}
        </div>
        {createMod ? <NewCollectionFormArr userId={userId} setSubmit={setSubmit} {...props}/> : null}
        <CollectionTable/>
      </div>
    </>
  )


}

const mapStateToProps = (state) => ({
  profile: getProfile(state)
})

export default compose(
  AuthDataHOC,
  connect(mapStateToProps, {
    getProfileThunk,
    saveCollectionThunk,
    deleteUserThunk,
    blockUserThunk,
    unblockUserThunk,
  }),
)(Profile)
