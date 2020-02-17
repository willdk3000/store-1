import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { withRouter } from "react-router";

import { sendSurvey } from '../../API.js'

class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }
  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  sendSurvey = async (values, history) => {
    // await sleep(300)
    // window.alert(JSON.stringify(values, 0, 2))
    await sendSurvey(values);
    this.props.history.push('/surveySent')
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        sendSurvey={this.sendSurvey}
      >
        {
          ({ sendSurvey, handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              {activePage}
              <div className="buttons">
                {page > 0 && (
                  <button className="btn btn-warning" type="button" onClick={this.previous}>
                    « Previous
                </button>
                )}
                {!isLastPage && <button className="btn btn-info" style={{ marginBottom: '15px' }} type="submit">Next »</button>}
                {isLastPage && (
                  <div>
                    <label style={{ fontSize: "14px" }}>Title</label>
                    <p className="form-control" type="text" style={{ marginBottom: '15px' }} readOnly>{values.title}</p>
                    <label style={{ fontSize: "14px" }}>Subject</label>
                    <p className="form-control" type="text" style={{ marginBottom: '15px' }} readOnly>{values.subject}</p>
                    <label style={{ fontSize: "14px" }}>Body</label>
                    <p className="form-control" type="text" style={{ marginBottom: '15px' }} readOnly>{values.body}</p>
                    <label style={{ fontSize: "14px" }}>Recipients</label>
                    <p className="form-control" type="text" style={{ marginBottom: '15px' }} readOnly>{values.recipients}</p>
                    <button type="submit" className="btn btn-success" onClick={() => sendSurvey(values)} style={{ marginBottom: '15px' }} disabled={submitting}>
                      Submit <i className="far fa-envelope"></i>
                    </button>
                  </div>

                )}
              </div>

            </form>
          )}
      </Form>
    )
  }
}

export default withRouter(Wizard);
