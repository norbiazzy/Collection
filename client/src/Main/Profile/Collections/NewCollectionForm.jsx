import React from "react";
import SingFormInput from "../../../Sing/SingForm/SingFormInput";
import {Form, Field} from "react-final-form";
import {TextareaForm} from "../../all/TextareaForm";
import Select from "react-select";
import {useState} from "react";
import HeadersInput from "./HeadersInput";
import s from "../Priofile.module.css";

const FieldPrefixContext = React.createContext();
const FieldPrefix = ({prefix, children}) => (
  <FieldPrefixContext.Provider value={prefix}>
    {children}
  </FieldPrefixContext.Provider>
);
const PrefixedField = ({name, ...props}) => (
  <FieldPrefixContext.Consumer>
    {prefix => <HeadersInput name={`${prefix}.${name}`}  {...props} />}
  </FieldPrefixContext.Consumer>
);

const useCounter = (initialValue = 0) => {
  let [value, setValue] = useState(initialValue)

  const add = () => setValue(prevState => ++prevState)
  const remove = () => setValue(prevState => --prevState)
  return {add, remove, value}
}

const NewCollectionForm = (props) => {

  const stringInputCount = useCounter()
  const numberInputCount = useCounter()
  const textInputCount = useCounter()
  const checkboxInputCount = useCounter()
  const dateInputCount = useCounter()

  let onSubmit = values => {
    console.log(values)
  }

  const ReactSelectAdapter = ({input, ...rest}) => (
    <Select options={props.topics}
            {...input} {...rest}
    />
  )

  const required = value => (value ? undefined : true)
  return (
    <Form
      onSubmit={onSubmit}
      validate={required}
      render={({handleSubmit}) => {
        props.setSubmit(handleSubmit)
        return (
          <form onSubmit={handleSubmit}>
            <div>
              <SingFormInput name={"name"} type={"text"} required={required} nameText={"Collection name"}/>
            </div>
            <div>
              <TextareaForm name={"description"} nameText={"Description"}/>
            </div>
            <div className={'mb-2'}>
              <Field
                name="topic"
                options={props.topics}
                component={ReactSelectAdapter}
              />
            </div>
            <div>
              <p>Additional fields</p>
              <div className={s.input__list + ' d-flex'}>
                <FieldPrefix prefix="headers">
                  <div className={s.input__item}>
                    <PrefixedField counter={stringInputCount} name={'string'} title={'String'}/>
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={numberInputCount}
                                   name={'number'}
                                   title={'Number'}
                    />
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={textInputCount}
                                   name={'text'}
                                   title={'Text'}
                    />
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={checkboxInputCount}
                                   name={'checkbox'}
                                   title={'Checkbox'}
                    />
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={dateInputCount}
                                   name={'date'}
                                   title={'Date'}
                    />
                  </div>
                </FieldPrefix>
              </div>
            </div>
          </form>
        )
      }}
    />
  )
}

export default NewCollectionForm