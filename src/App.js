import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap/bootstrap.css'
import TodoApp from './components/todo/TodoApp'
class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoApp></TodoApp>
        <div>
        </div>
        
      </div>
      
    );
  }
}




export default App;
