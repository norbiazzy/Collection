import {useCallback, useEffect, useState} from "react";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {compose} from "redux";
import {connect} from "react-redux";
import Loader from "../../../all/Loader";
import {getItemListThunk} from "../../../redux/ItemsReducer";
import {getItemListSelect} from "../../../redux/selectors/item-select";
import NewsItemRow from "./NewsItemRow";
import useSortableData from "../../../hooks/useSortableData";

const NewsItemsTable = (props) => {
  const [loading, setLoading] = useState(true)
  const {items, requestSort, sortConfig} = useSortableData(props.itemList);
  const getClassNamesFor = (name) => {
    if (!sortConfig) return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  const getItemsList = useCallback(async () => {
    await props.getItemListThunk()
    setLoading(false)
  }, [props.iToken])
  
  useEffect(() => getItemsList(), [getItemsList])
  if (loading) return <Loader/>
  
  
  return (<>
    <h2>Items</h2>
    <table className="table text-center">
      <thead>
      <tr>
        <th scope="col" className={getClassNamesFor('name')}
            onClick={() => requestSort('name')}>Name
        </th>
        <th scope="col" className={getClassNamesFor('description')}
            onClick={() => requestSort('description')}>Description
        </th>
        <th scope="col" className={getClassNamesFor('topic')}
            onClick={() => requestSort('topic')}>Topic
        </th>
        <th scope="col" className={getClassNamesFor('collectionName')}
            onClick={() => requestSort('collectionName')}>Collection
        </th>
        <th scope="col" className={getClassNamesFor('username')}
            onClick={() => requestSort('username')}>Author
        </th>
        <th scope="col" className={getClassNamesFor('likes')}
            onClick={() => requestSort('likes')}>Likes
        </th>
        {/*<th scope="col">Comments</th>*/}
      </tr>
      </thead>
      <tbody>
      {items.map(item => <NewsItemRow key={item._id} item={item}/>)}
      </tbody>
    </table>
  </>)
}
const mapStateToProps = (state) => ({
itemList: getItemListSelect(state)
})
export default compose(AuthDataHOC, connect(mapStateToProps, {getItemListThunk}))(NewsItemsTable)