import React, {useEffect, useState} from "react";
import s from './Priofile.module.css'
import NewCollection from "./Collections/NewCollection";
import Collection from "./Collections/Collection";


const Profile = (props) => {
  
  useEffect(() => {
    if (!props.profile.isProfile) props.getProfile(props.userId) // just shit
  })
  let [createMod, setCreateMod] = useState(false)
  
  const toggleCreateMod = () => {
    setCreateMod(!createMod)
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
          <button className='btn btn-dark'>token</button>
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
        <Collection/>
      </div>
    </>
  )
  
  
}

export default Profile