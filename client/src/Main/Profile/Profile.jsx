import React, {useCallback, useEffect, useState} from "react";
import s from './Priofile.module.css'
import NewCollection from "./Collections/NewCollection";
import Collection from "./Collections/Collection";
import {Navigate, useNavigate} from "react-router-dom";


const Profile = (props) => {
  let [loading, setLoading] = useState(true)
  let [createMod, setCreateMod] = useState(false)
  
  let navigate = useNavigate();
  let getProfile = useCallback(() => {
    props.getProfileThunk(props.token)
      .then(() => setLoading(false))
  }, [props.token])
  useEffect(() => {
    getProfile()
  }, [getProfile])
  
  const toggleCreateMod = () => {
    setCreateMod(prevState => !prevState)
  }
  const handelCollection = (key) => navigate('/items/' + key)
  let collections
  if (props.profile && props.profile.collections) {
    collections = props.profile.collections.map((collection, i) => <Collection callback={handelCollection}
                                                                               id={collection._id} key={collection._id}
                                                                               value={collection}/>)
  }
  
  if (loading) {
    return (
      <div>Загрузка...</div>
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
        <div>
          collections
        </div>
      </div>
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h2>Collections</h2>
          <div>
            <button className={'btn ' + (createMod ? 'btn-danger' : 'btn-dark')}
                    onClick={toggleCreateMod}>{createMod ? 'Close' : 'Create new Collection'}
            </button>
          </div>
        </div>
        {createMod ? <NewCollection {...props}/> : null}
        {collections}
      </div>
    </>
  )
  
  
}

export default Profile