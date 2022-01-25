import React, {useCallback, useEffect, useState} from "react";
import s from './Priofile.module.css'
import NewCollection from "./Collections/NewCollection";
import Collection from "./Collections/Collection";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import NewCollectionForm from "./Collections/NewCollectionForm";


const Profile = (props) => {
  const [loading, setLoading] = useState(true)
  const [createMod, setCreateMod] = useState(false)
  const profileId = useParams().id
  const navigate = useNavigate()
  let submit
  let setSubmit = (e) => {
    submit = e
  }

  const getProfile = useCallback(() => {
    if (!props.token) return navigate('/')
    props.getProfileThunk(props.token, profileId)
      .then(() => setLoading(false))
  }, [props.token, profileId])
  useEffect(() => {
    getProfile()
  }, [getProfile])

  const toggleCreateMod = () => {
    setCreateMod(prevState => !prevState)
  }
  let collections
  if (props.profile && props.profile.collections) {
    collections = props.profile.collections.map((collection, i) => <Collection id={collection._id} key={collection._id}
                                                                               value={collection}/>)
  }

  if (loading) {
    return (

      <div className="spinner-border position-absolute top-50 start-50" role="status">
        <span className="visually-hidden ">Loading...</span>
      </div>
    )
  }

  return (
    <>
      <h2>Profile</h2>
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
            {createMod ? <button className={'btn btn-success me-2'} onClick={event => submit(event)}>Create</button> : null}
            <button className={'btn ' + (createMod ? 'btn-danger' : 'btn-dark')}
                    onClick={toggleCreateMod}>{createMod ? 'Close' : 'Create new Collection'}
            </button>
          </div> : null}
        </div>
        {createMod ? <NewCollectionForm setSubmit={setSubmit} {...props}/> : null}
        {collections}
      </div>
    </>
  )


}

export default Profile