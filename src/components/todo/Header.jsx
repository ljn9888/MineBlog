import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService.jsx'
import { Link } from 'react-router-dom'

export default class Header extends Component {
    render() {
      var isUserLoggedIn = AuthenticationService.isUserLoggedIn()
      console.log(isUserLoggedIn)
      return (
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div><a href=""></a></div>
            <ul className="navbar-nav justify-content-end">
              <li><Link className="nav-link" to="/welcome/hehe">Home</Link></li>
              <li><Link className="nav-link" to="/todos">Todos</Link></li>
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              <li><Link className="nav-link" to="/login">Login</Link></li>
              <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>
            </ul>
          </nav>
        </header>
      )
    }
  }