import axios from "axios"
import {API_URL} from "../../Constant"

class TodoService {
    
    retrieveAllTodos() {
        let username = '123456'
        let password = 'dummy'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log(basicAuthHeader)
        return axios.get('http://localhost:8080/users/123456/todos')
    }

    deleteTodo(name, id) {
        let username = '123456'
        let password = 'dummy'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.delete(`http://localhost:8080/users/${name}/todos/${id}`)
    }
    getTodo(name, id) {
        let username = '123456'
        let password = 'dummy'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.get(`http://localhost:8080/users/${name}/todos/${id}`)
    }
    updateTodo(name, id, todo) {
        let username = '123456'
        let password = 'dummy'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.put(`http://localhost:8080/users/${name}/todos/${id}`, todo)
    }
    createTodo(name, id, todo) {
        return axios.post(`http://localhost:8080/users/${name}/todos/${id}`)
    }
}

export default new TodoService()