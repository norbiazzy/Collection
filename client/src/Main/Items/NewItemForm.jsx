
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
    let maxInputs = [stringInputCount.value,
      numberInputCount.value,
      textInputCount.value,
      checkboxInputCount.value,
      dateInputCount.value].sort((a, b) => b - a)[0]
    let body = {
      ...values,
      headers: {
        string: [],
        number: [],
        text: [],
        checkbox: [],
        date: [],
      }
    }
    for (let i = 0; i < maxInputs; i++) {
      if (values.headers['string-' + i]) body.headers['string'].push(values.headers['string-' + i])
      if (values.headers['number-' + i]) body.headers['number'].push(values.headers['number-' + i])
      if (values.headers['text-' + i]) body.headers['text'].push(values.headers['text-' + i])
      if (values.headers['checkbox-' + i]) body.headers['checkbox'].push(values.headers['checkbox-' + i])
      if (values.headers['date-' + i]) body.headers['date'].push(values.headers['date-' + i])
    }
    props.saveCollectionThunk(body, props.token)
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
              <div className={s.input__list + ' d-flex'}>
                <FieldPrefix prefix="headers">
                  <div className={s.input__item}>
                    <PrefixedField counter={stringInputCount} name={'string'} title={'String'}/>
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={numberInputCount}
                                   name={'number'}
                                   title={'Number'}/>
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={textInputCount}
                                   name={'text'}
                                   title={'Text'}/>
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={checkboxInputCount}
                                   name={'checkbox'}
                                   title={'Checkbox'}/>
                  </div>
                  <div className={s.input__item}>
                    <PrefixedField counter={dateInputCount}
                                   name={'date'}
                                   title={'Date'}/>
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
const mapStateToProps = (state) => ({
  topics: getTopicsSelect(state)
})
export default compose(
  AuthDataHOC,
  connect(mapStateToProps),
)(NewCollectionForm)
