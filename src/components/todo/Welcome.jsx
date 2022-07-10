import React, { Component } from 'react'
import { useParams , Link} from 'react-router-dom'
import HelloWorldService from '../../api/todo/HelloWorldService'

class Welcome extends Component {

  constructor() {
    super()
    this.state = {
      welcomeMessage : '',
      data: ''
    }
  }

  render() {
    return (
      <div><h1>Welcome, Welcome{this.props.params.name}</h1>
      <div>you can manage your todos <Link to="/todos">here{this.state.data}</Link></div>
      <div className='container'>
        <button onClick={this.retrieveMessage} className="button"></button>
      </div>
      <div className='container'>
      </div>
      </div>
    )
  }

  HandleError = (error) => {
    console.log(error.response)
    let errorMessage = '';
    if(error.message != undefined) {
      errorMessage += error.message
      if(error.response && error.response.data) {
        errorMessage += error.response.data.message;
      }
      this.setState({welcomeMessage: errorMessage, data: error.response.data.message})
    }
  }

  retrieveMessage = () => {
    HelloWorldService.executePath(this.props.params.name)
      .then(response => console.log(response.data))
      .catch(error => this.HandleError(error))
    }

  PrintMessage = (response) => {
    console.log("hehe")
    this.setState({data: response.data.message})
  }
}

 function TodoWelcomeWithParam(){
  var name = useParams()
  return <Welcome params={name}></Welcome>
}

export default TodoWelcomeWithParam
 
