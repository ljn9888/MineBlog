import { BrowserRouter as Link, useNavigate,useParams  } from 'react-router-dom'
import React, { Component } from 'react'
import moment from 'moment'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import TodoService from '../../api/todo/TodoService'
import AuthenticationService from './AuthenticationService'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state ={
      id: this.props.params.id,
      description : 'learn from',
      date : moment(new DataTransfer()).format('YYYY-MM-DD')
    }
  }

  onSubmit = (values) => {
    let username = AuthenticationService.getLoggedInUserName()
    console.log("this is saved")
    TodoService.updateTodo(username, this.state.id, {
      id: this.state.id,
      description: values.description,
      date: values.date
    })
    this.props.navigate(`/todos`)
  }

  componentDidMount() {
    let username = AuthenticationService.getLoggedInUserName()
    TodoService.getTodo(username, this.state.id)
      .then(response => this.setState({
        id: this.props.params.id,
        description: response.data.description,
        date: response.data.date
      })
      )
  }

  render() {
    console.log(this.state)
    let {description, date} = this.state
    return (      
    <div>
      <h1>Todo</h1>
      <div className="container">
        <Formik initialValues={{description, date}} onSubmit={this.onSubmit} enableReinitialize={true} validateOnChange={false} validateOnBlur={false} validate={this.validate}>
          {
            (props) => (
              <Form>
                <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                <ErrorMessage name="target" component="div" className="alert alert-warning"></ErrorMessage>
                <fieldset className='form-group'>
                <label>Description</label>
                  <Field className="form-control" type="text" name="description"/>
                </fieldset>
                <fieldset>
                <label>Target Date</label>
                  <Field className="form-control" type="date" name="target"/>
                </fieldset>
                <button className='btn btn-success' type="submit">Save</button>
              </Form>
            )
          }
        </Formik>
      </div>
      Todo Component for {this.props.params.id}
    </div>)
  }
  
  validate = (values) => {
    let errors = {}
    if(!values.description) {
      errors.description = 'Enter a Description Plz'
    } else if(values.description.length < 5) {
      errors.description = 'Should have at least 5 characters'
    }

    if(!moment(values.date).isValid()) {
      errors.date = 'Please enter valid Date'
    }
    // console.log(errors)
    return errors
  }
}



function TodoWithNavigation() {
  return <Todo params={useParams()} navigate={useNavigate()}></Todo>
}

export default TodoWithNavigation;

