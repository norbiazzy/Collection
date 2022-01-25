import React from "react";
import {minusSVG, plusSVG} from "../../../assets/svg/svgExport"
import s from "../Priofile.module.css";

const AmountInputSetting = (props) => {

  return (
    <div className={'d-flex justify-content-center align-items-center mb-2'}>
      <button onClick={() => props.counter.remove()}
              disabled={props.counter.value <= 0}
              className={'btn btn-dark'}>{minusSVG(s.buttonSVG)}
      </button>
      <span className={'mx-2'}>{props.title}</span>
      <button onClick={() => props.counter.add()}
              className={'btn btn-dark'}>{plusSVG(s.buttonSVG)}
      </button>
    </div>
  )


}

export default AmountInputSetting
