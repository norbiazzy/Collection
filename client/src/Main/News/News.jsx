import {useCallback, useEffect, useState} from "react";
import Collection from "../Profile/Collections/Collection";
import Items from "../Items/Items";
import NewsItems from "./NewsItems";

const News = (props) => {
  const [loading, setLoading] = useState(true)
  const getCollections = useCallback(() => {
    props.getCollectionsThunk()
      .then(() => setLoading(false))
  }, [])
  const getItems = useCallback(() => {
    props.getItemsThunk()
      .then(() => setLoading(false))
  }, [])
  let content
  useEffect(() => {
    if (props.contentType === 'items') getItems()
    else if (props.contentType === 'collections') getCollections()
    
  }, [getCollections, props.contentType])
  
  if (loading) return (<div>Loading...</div>)
  switch (props.contentType) {
    case 'collections':
      content = props.collections.map(c => <Collection value={c} id={c._id}/>)
      break
    case 'items':
      debugger
      content = <NewsItems items={props.items}/>
  }
  
  console.log(props.contentType)
  return (
    <div>
      <div>
        <button className={'btn btn-dark me-1'} onClick={() => {
          props.setContentAC('collections')
          setLoading(true)
        }} disabled={props.contentType === 'collections'}>Collections
        </button>
        <button className={'btn btn-dark'} onClick={() => {
          props.setContentAC('items')
          setLoading(true)
        }} disabled={props.contentType === 'items'}>Items
        </button>
      </div>
      <h2>Content</h2>
      {content}
    </div>
  )
}

export default News