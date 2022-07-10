import React, { Component } from 'react'
import { BrowserRouter as Router, Route, useNavigate, Routes, useParams, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.jsx'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import ListTodoWithNavigation from './ListTodo'
import Header from './Header'
import Footer from './Footer'
import WelcomeWithParam from './Welcome'
import './TodoApp.css'
import TodoWithNavigation from './Todo.jsx'
import HelloWorldService from '../../api/todo/HelloWorldService.js'
// import withNavigation from './withNavigation'
 export default class TodoApp extends Component {
  render() {
    return (
      <div className = "TodoApp">
        <Router> 
          <Header></Header>
          <Routes>
          <Route path="/" element={<LoginComponentWithNavigation />} />
          <Route path="/login" element={<LoginComponentWithNavigation />} />
          <Route path="/todos" element={<AuthenticatedRoute><ListTodoWithNavigation/></AuthenticatedRoute>}/> 
          <Route path="/todos/:id" element={<AuthenticatedRoute><TodoWithNavigation/></AuthenticatedRoute>}/> 
          <Route path="/logout" element={<Logout/>}/> 
          <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeWithParam/></AuthenticatedRoute>}/>
          <Route path="*" element={<Error/>}/> 
          </Routes>
          {/* <Navigate element={<LoginComponentWithNavigation />} /> */}
          <Footer></Footer>
        </Router>
        {/* <Login></Login>
        <Welcome></Welcome> */}
      </div>
    )
  }
}

class Logout extends Component {
  render() {
    return (
      <div><h1>You are log out</h1>
      <div class="container"></div>
      </div>
    )
  }
}

class Error extends Component {
  render() {
    return (
      <div><h1>Error!</h1>
      </div>
    )
  }
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '123456',
      password: '',
      hasLoginFailed: false,
      showSuccessfulMessage: true
    }
    // this.InvalidCredentials = this.InvalidCredentials.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }) 
    console.log(`password: ` + this.state.password)
  }

  loginChecked = () => {
    this.setState({
      hasLoginFailed : false
    })
    
    // AuthenticationService.executePath(this.state.username, this.state.password)
    // .then(() =>{
    //   console.log('Successful')
    //   this.props.navigate(`/welcome/${this.state.username}`)
    //   sessionStorage.setItem('authenticatedUser', this.state.username)
    // })
    // .catch(() =>{
    //   this.setState({showSuccessfulMessage: false})
    //   this.setState({hasLoginFailed: true})      
    // })

  // AuthenticationService.executePath(this.state.username, this.state.password)
  //   .then(() =>{
  //     console.log('Successful')
  //     this.props.navigate(`/welcome/${this.state.username}`)
  //     sessionStorage.setItem('authenticatedUser', this.state.username)
  //   })
  //   .catch(() =>{
  //     this.setState({showSuccessfulMessage: false})
  //     this.setState({hasLoginFailed: true})      
  //   })

    AuthenticationService.executeJwtPath(this.state.username, this.state.password) 
    .then((response) =>{
      console.log('Successful')
      AuthenticationService.registerSuccessfulLogin(this.state.username, response.data.token)
      this.props.navigate(`/welcome/${this.state.username}`)
      sessionStorage.setItem('authenticatedUser', this.state.username)
    })
    .catch(() =>{
      this.setState({showSuccessfulMessage: false})
      this.setState({hasLoginFailed: true})      
    })
    // if(this.state.username==='123456' && this.state.password==='dummy') {
    //   console.log('Successful')
    //   this.props.navigate(`/welcome/${this.state.username}`)
    //   sessionStorage.setItem('authenticatedUser', this.state.username)
    // }
    // else {
    //   this.setState({showSuccessfulMessage: false})
    //   this.setState({hasLoginFailed: true})
    // }
  }

  render() {
      return (
          <div>
              {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
              {this.state.showSuccessfulMessage && <div className=''>ILogin Successful</div>}
              {/* <InvalidCredentials hasLoginFailed={this.state.hasLoginFailed}></InvalidCredentials> */}
              User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
              Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
              <button onClick={this.loginChecked} value="log in" className='button'></button>
          </div>
      )
  }
}

const LoginComponentWithNavigation = withNavigation();

function withNavigation() {
  return props => <Login {...props} navigate={useNavigate()} />
}
