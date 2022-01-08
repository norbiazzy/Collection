import React from "react";

const AmountInputSetting = (props) => {
  
  return (<div className={''}>
    <button onClick={() => props.setCount(props.count - 1)}
            disabled={props.count <= 0}
            className={'btn btn-dark'}>-
    </button>
    <span className={'mx-2'}>{props.count}</span>
    <button onClick={() => props.setCount(props.count + 1)}
            disabled={props.count >= props.maxCount}
            className={'btn btn-dark'}>+
    </button>
  </div>)
  
  
}

export default AmountInputSetting
