import React, { Component } from 'react'
import TodoService from '../../api/todo/TodoService'
import AuthenticationService from './AuthenticationService'
import { BrowserRouter as Link, useNavigate,useParams  } from 'react-router-dom'
import { Button } from '@mui/material';

class ListTodo extends Component {
    constructor(props){
      super(props) 
      this.state = {
        todos : 
        [
          // {id: 1, description: 'Learn React', done:false},
          // {id: 1, description: 'Become an Expert', done:false},
          // {id: 1, description: 'Visit Vancouver', done:false}
        ],
        message:null
      }
    }
    componentWillUnmount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
      // console.log('shouldlog')
      // console.log(nextProps)
      // console.log(nextState)
      return true
    }

    componentDidMount() {
      let username = AuthenticationService.getLoggedInUserName()
      console.log("sessionusername  " + username)
      this.AddTodoClicked(username)
    }

    AddTodoClicked(username) {
      
      TodoService.retrieveAllTodos(username)
      .then(Response => {
        this.setState({todos: Response.data})
        // console.log(Response)
      })
    }
  
    render() {
      return (<div>
        <h1>List Todos</h1>
        <table className="table">
          {this.state.message && <div>{this.state.message }</div>}
          <thead>
            <tr>
            <th>description</th>
            <th>data</th>
            <th>time</th>
            <th>Is Completed?</th>
            </tr>
          </thead>
          <tbody> {
            this.state.todos.map(
              todo =>
              <tr>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
              <td>{todo.done.toString()}</td>
              <td><Button variant="contained" onClick={() => this.updateTodoClicked(todo.id)}>Update</Button></td>
              <td><Button variant="outlined" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</Button></td>
              </tr>
              )
            }
            
          </tbody>
        </table>
        </div>
      )
    }

    deleteTodoClicked = (id) => {
      let username = AuthenticationService.getLoggedInUserName()
      console.log(id)
      TodoService.deleteTodo(username, id).then(
        response => {this.setState({message:  `Delete todo id ${id}`})}
      )
      this.AddTodoClicked(username)
    }

    updateTodoClicked = (id) => {
      let username = AuthenticationService.getLoggedInUserName()
      console.log(id)
      this.props.navigate(`/todos/${id}`)
      // TodoService.updateTodo(username, id).then(
      //   response => {this.setState({message:  `Delete todo id ${id}`})}
      // )
      this.AddTodoClicked(username)
    }
  }
 
function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />
}


const ListTodoWithNavigation = withNavigation(ListTodo);

export default ListTodoWithNavigation;