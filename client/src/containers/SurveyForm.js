/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { Field } from 'react-final-form'
import Wizard from '../components/surveys/Wizard'

import { sendSurvey } from '../API.js'


//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
const onSubmit = async values => {
  // await sleep(300)
  // window.alert(JSON.stringify(values, 0, 2))
}


const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const required = value => (value ? undefined : 'Required')

export const SurveyForm = () => (
  <React.Fragment>
    <div className="container">
      <h1>New survey</h1>
      <Wizard
        initialValues={{}}
        onSubmit={onSubmit}
      >
        <Wizard.Page>
          <div>
            <label style={{ fontSize: "14px" }}>Title</label>
            <Field
              name="title"
              component="input"
              type="text"
              placeholder="Title"
              validate={required}
              className="form-control col-6"
              style={{ marginBottom: '15px' }}
            />
            <Error name="Title" />
          </div>
          <div>
            <label style={{ fontSize: "14px" }}>Subject</label>
            <Field
              name="subject"
              component="input"
              type="text"
              placeholder="Subject"
              validate={required}
              className="form-control col-6"
              style={{ marginBottom: '15px' }}
            />
            <Error name="Subject" />
          </div>
          <div>
            <label style={{ fontSize: "14px" }}>Email body</label>
            <Field
              name="body"
              component="input"
              type="text"
              placeholder="Email body"
              validate={required}
              className="form-control"
              style={{ marginBottom: '15px' }}
            />
            <Error name="Body" />
          </div>
          <div>
            <label style={{ fontSize: "14px" }}>Recipients</label>
            <Field
              name="recipients"
              component="input"
              type="text"
              placeholder="Recipients"
              validate={required}
              className="form-control"
              style={{ marginBottom: '15px' }}
            />
            <Error name="Recipients" />
          </div>
        </Wizard.Page>
        <Wizard.Page
          validate={values => {
            const errors = {}
            if (!values.email) {
              errors.email = 'Required'
            }
            if (!values.favoriteColor) {
              errors.favoriteColor = 'Required'
            }
            return errors
          }}
        >
          <div>
            <h2>Review form data</h2>
          </div>
        </Wizard.Page>
      </Wizard>
    </div>
  </React.Fragment>
)
