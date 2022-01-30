import React from 'react'
import {render} from 'react-dom'
import Styles from './Styles'
import {Form, Field} from 'react-final-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const App = () => {
  let submit
  return (
    <>
      <div className="buttons">

        <button
          type="submit"
          onClick={event => {            submit(event)          }}
        >
        </button>
      </div>
      <Form
        onSubmit={onSubmit}
        render={({handleSubmit, form, submitting, pristine, values}) => {
          submit = handleSubmit
          return (
            <form id="exampleForm" onSubmit={handleSubmit}>
              <div>
                <label>First Name</label>
                <Field
                  name="firstName"
                  component="input"
                  type="text"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label>Last Name</label>
                <Field
                  name="lastName"
                  component="input"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <label>Favorite Color</label>
                <Field name="favoriteColor" component="select">
                  <option/>
                  <option value="#ff0000">❤️ Red</option>
                  <option value="#00ff00">💚 Green</option>
                  <option value="#0000ff">💙 Blue</option>
                </Field>
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          )
        }}
      />
    </>
  )
}

render(<App/>, document.getElementById('root'))
