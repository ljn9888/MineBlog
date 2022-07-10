import axios from "axios"

class HelloWorldService {

    executePath(name) {
        let username = '123456'
        let password = 'dummy'
        let basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        return axios.get(`http://localhost:8080/basicauth`, {headers: {Authorization: basicAuthHeader}})
    }
}

export default new HelloWorldService()