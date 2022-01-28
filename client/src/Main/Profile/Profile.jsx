import React, {useCallback, useEffect, useState} from "react";
import s from './Priofile.module.css'
import {NavLink, useParams} from "react-router-dom";
import NewCollectionForm from "./Collections/NewCollectionForm";
import {useNavigate} from "react-router";
import EditProfile from "./EditProfile";
import CollectionTable from "./Collections/CollectionTable";
import {connect} from "react-redux";
import {deleteCollectionThunk, saveCollectionThunk} from "../../redux/collectionsReducer";
import {getProfile} from "../../redux/selectors/user-select";
import AuthDataHOC from "../../hoc/AuthDataHOC";
import {compose} from "redux";
import {getCollectionListSelect} from "../../redux/selectors/collection-select";
import {deleteUserThunk, getProfileThunk} from "../../redux/uersReducer";
import Loader from "../all/Loader";
import {editSVG} from "../../assets/svg/svgExport";
import NewCollectionFormArr from "./Collections/NewCollectionFormArr";


let Profile = (props) => {
  const [loading, setLoading] = useState(true)
  const [createMod, setCreateMod] = useState(false)
  const [editProfileMod, setEditProfileMod] = useState(false)
  const [errorPage, setErrorPage] = useState(false)
  const profileId = useParams().id
  const navigate = useNavigate()
  let submit
  let setSubmit = (e) => {
    submit = e
  }
  const getProfile = useCallback(async () => {
    if (!props.token) return navigate('/')
    let res = await props.getProfileThunk(props.token, profileId)
    
    if (res) {
      setLoading(false)
      setErrorPage(!res)
    }
    
  }, [props.token, profileId])
  
  useEffect(() => getProfile(), [getProfile])
  
  const toggleMod = (value) => value(prevState => !prevState)
  
  if (loading) return <Loader/>
  
  if (errorPage) {
    return (
      <div>
        <h2>Error 404</h2>
        <p> Profile is not defined :( </p>
        <NavLink to={'/'}>Go to home page</NavLink>
      </div>
    )
  }
  
  const deleteUser = () => {
    props.deleteUserThunk(props.token, props.userId)
  }
  const blockUser = () => {
    // blockUserThunk(props.token, props.userId)
  }
  
  return (
    <>
      {editProfileMod ? <EditProfile deleteUser={deleteUser} blockUser={blockUser}
                                     profile={props.profile} closeModal={() => toggleMod(setEditProfileMod)}/> : null}
      <div className={'d-flex'}>
        <h2>Profile</h2>
        {props.adminMod || props.profile.userId === props.userId ?
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
          <p>{props.profile.name}</p>
          <p>{props.profile.status}</p>
        </div>
      </div>
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h2>Collections</h2>
          {props.adminMod || props.profile.userId === props.userId ? <div>
            {createMod ? <button className={'btn btn-success me-2'}
                                 onClick={event => submit(event)}>Create
            </button> : null}
            <button className={'btn ' + (createMod ? 'btn-danger' : 'btn-dark')}
                    onClick={() => toggleMod(setCreateMod)}>{createMod ? 'Close' : 'Create new Collection'}
            </button>
          </div> : null}
        </div>
        {createMod ? <NewCollectionFormArr setSubmit={setSubmit} {...props}/> : null}
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
  }),
)(Profile)
