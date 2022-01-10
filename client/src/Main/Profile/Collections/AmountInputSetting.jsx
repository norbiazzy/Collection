import React from "react";

const AmountInputSetting = (props) => {
  
  return (<div className={''}>
    <button onClick={() => props.counter.remove()}
            disabled={props.counter.value <= 0}
            className={'btn btn-dark'}>-
    </button>
    <span className={'mx-2'}>{props.counter.value}</span>
    <button onClick={() => props.counter.add()}
            className={'btn btn-dark'}>+
    </button>
  </div>)
  
  
}

export default AmountInputSetting
