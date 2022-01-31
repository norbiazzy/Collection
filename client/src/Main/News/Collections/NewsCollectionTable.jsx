import {useCallback, useEffect, useState} from "react";
import AuthDataHOC from "../../../hoc/AuthDataHOC";
import {compose} from "redux";
import {connect} from "react-redux";
import Loader from "../../../all/Loader";
import {getCollectionListSelect} from "../../../redux/selectors/collection-select";
import {getCollectionListThunk} from "../../../redux/collectionsReducer";
import NewsCollectionRow from "./NewsCollectionRow";
import useSortableData from "../../../hooks/useSortableData";

const NewsItemsTable = (props) => {
  const [loading, setLoading] = useState(true)
  const {items, requestSort, sortConfig} = useSortableData(props.collectionList);
  
  const getClassNamesFor = (name) => {
    if (!sortConfig) return
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  
  
  const getCollectionList = useCallback(async () => {
    await props.getCollectionListThunk()
    setLoading(false)
  }, [props.iToken])
  
  useEffect(() => getCollectionList(), [getCollectionList])
  
  if (loading) return <Loader/>
  return (<>
    <h2>Collections</h2>
    <table className="table text-center">
      <thead>
      <tr>
        <th scope="col" className={getClassNamesFor('name')} onClick={()=>requestSort('name')}>Name</th>
        <th scope="col" className={getClassNamesFor('description')} onClick={()=>requestSort('description')}>Description</th>
        <th scope="col" className={getClassNamesFor('topic')} onClick={()=>requestSort('topic')}>Topic</th>
        <th scope="col" className={getClassNamesFor('itemsLength')} onClick={()=>requestSort('itemsLength')}>Items</th>
        <th scope="col" className={getClassNamesFor('email')} onClick={()=>requestSort('email')}>Author</th>
        <th scope="col" className={getClassNamesFor('created')} onClick={()=>requestSort('created')}>Created</th>
      </tr>
      </thead>
      <tbody>
      {items.map(collection => <NewsCollectionRow key={collection._id} collection={collection}/>)}
      </tbody>
    </table>
  </>)
}
const mapStateToProps = (state) => ({
  collectionList: getCollectionListSelect(state)
})
export default compose(AuthDataHOC, connect(mapStateToProps, {getCollectionListThunk}))(NewsItemsTable)