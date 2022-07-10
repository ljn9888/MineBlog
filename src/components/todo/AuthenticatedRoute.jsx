import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService'
import { BrowserRouter as Router, Route, NavLink, Navigate } from 'react-router-dom'


export default class AuthenticatedRoute extends Component {
  render() {
    if(AuthenticationService.isUserLoggedIn()) {
        console.log(this.props.children)
        return {...this.props.children}
    }
    else {
        return <Navigate to="/login"/>
    }
  }
}
