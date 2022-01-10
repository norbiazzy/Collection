import React, {useCallback, useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import ItemsForm from "./ItemsForm";


const Items = (props) => {
  let [loading, setLoading] = useState(true)
  let id = useParams().id
  
  let getCollection = useCallback(() => {
    props.getCollectionThunk(props.token, id)
      .then(() => setLoading(false))
  }, [id])
  
  useEffect(() => {
    getCollection()
  }, [getCollection])
  
  if (loading) {
    return (
      <div>Загрузка...</div>
    )
  }
  return (
    <div>
      <h2>{props.collection.name}</h2>
      <p>{props.collection.description}</p>
      <p>{props.collection.created}</p>
      <p>{props.collection.topic}</p>
      <ItemsForm amounthInputs={props.collection.amountInputs}/>
    </div>)
}

export default Items