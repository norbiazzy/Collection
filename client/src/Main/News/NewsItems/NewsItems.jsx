import React from 'react';
import {useNavigate} from "react-router-dom";

const NewsItems = (props) => {
  let navigate = useNavigate()
  let a = []
  for (const key in props.item.headersInp) {
    a.push(props.item.headersInp[key].map((header, i) => {
      return (
        <div className={'d-flex'}>
          <span>{header}: </span>
          {props.item.bodyInputs[key][i]}
        </div>
      )
    }))
  }
  return (
    <div onClick={() => navigate('/items/' + props.item.collectionId)}>
      <div>
        <h4>{props.item.collectionName}</h4>
      </div>
      <div className={'d-flex'}>
        <div>
          <p>{props.item.name}</p>
          <p>{props.item.description}</p>
          <p>{props.item.tags.join(' ')}</p>
        </div>
        <div>
          {a}
        </div>
      </div>
    </div>
  );
};

export default NewsItems;
