import React from "react";
import s from "../Priofile.module.css";
import {Field} from "react-final-form";
import AmountInputSetting from "./AmountInputSetting";

const required = value => (value ? undefined : true)

const HeadersInput = (props) => {
  const inputs = []
  for (let i = 0; i < props.counter.value; i++) {
    inputs.push(<Field className={'w-100 mb-1'} name={props.name + '-' + i} component={"input"} validate={required}/>)
  }
  return (
    <>
      <AmountInputSetting counter={props.counter} title={props.title}/>
      <div className={'d-flex flex-column w-100'}>
        {inputs}
      </div>
    </>
  )


}

export default HeadersInput
