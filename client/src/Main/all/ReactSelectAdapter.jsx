import Select from "react-select";
import React from "react";

const ReactSelectAdapter = ({input, ...rest}) => (
  <Select {...input} {...rest}/>
)

export default ReactSelectAdapter