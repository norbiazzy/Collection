import React from "react";
import InputForm from "../../../Sing/SingForm/InputForm";
import {Form, Field} from "react-final-form";
import {FieldArray} from "react-final-form-arrays";
import {TextareaForm} from "../../all/TextareaForm";
import Select from "react-select";
import {useState} from "react";
import HeadersInput from "./HeadersInput";
import s from "../Priofile.module.css";
import {saveCollectionThunk} from "../../../redux/collectionsReducer";


const useCounter = (initialValue = 0) => {
  let [value, setValue] = useState(initialValue)

  const add = () => setValue(prevState => ++prevState)
  const remove = () => setValue(prevState => --prevState)
  return {add, remove, value}
}

const NewCollectionFormArr = (props) => {

  const stringInputCount = useCounter()
  const numberInputCount = useCounter()
  const textInputCount = useCounter()
  const checkboxInputCount = useCounter()
  const dateInputCount = useCounter()

  let onSubmit = values => {
    console.log(values)
    for (let valuesKey in values.headers) {
      console.log(valuesKey)
    }
    // props.saveCollectionThunk(body)
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
              <InputForm name={"name"} type={"text"} required={required} nameText={"Collection name"}/>
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
              <FieldArray name="headers">
                {({fields}) => (
                  <div className={s.input__list + ' d-flex'}>
                    <div className={s.input__item}>
                      <HeadersInput counter={stringInputCount} name={'string'} title={'String'}/>
                    </div>
                    <div className={s.input__item}>
                      <HeadersInput counter={numberInputCount}
                                    name={'number'}
                                    title={'Number'}/>
                    </div>
                    <div className={s.input__item}>
                      <HeadersInput counter={textInputCount}
                                    name={'text'}
                                    title={'Text'}/>
                    </div>
                    <div className={s.input__item}>
                      <HeadersInput counter={checkboxInputCount}
                                    name={'checkbox'}
                                    title={'Checkbox'}/>
                    </div>
                    <div className={s.input__item}>
                      <HeadersInput counter={dateInputCount}
                                    name={'date'}
                                    title={'Date'}/>
                    </div>
                  </div>
                )}
              < /FieldArray>
            </div>
          </form>
        )
      }}
    />
  )
}

export default NewCollectionFormArr