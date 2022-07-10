import axios from "axios"

 class AuthenticationService {

    executePath(username, password) {
        
        var basicAuthHeader = 'Basic ' + window.btoa(username + ":" + password)
        console.log(basicAuthHeader)
        this.setupAxiosInterceptors(basicAuthHeader)
        return axios.get(`http://localhost:8080/basicauth`, {headers: {Authorization: basicAuthHeader}})
        
        // return axios.get(`http://localhost:8080/basicauth`)
    }


    executeJwtPath(username, password) {
        // this.setupAxiosInterceptors(basicAuthHeader)
        return axios.post(`http://localhost:8080/authenticate`, {username, password})
        
        // return axios.get(`http://localhost:8080/basicauth`)
    }

    registerSuccessfulLogin(username, token) {
        this.setupAxiosInterceptors('Bearer ' + token)
    }
    
    logout (){
        sessionStorage.removeItem('authenticatedUser')
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        return user === null ? '' : user
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) =>{
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token //this.token)
                }
                return config
            }
        )
    }

    isUserLoggedIn () {
        let user = sessionStorage.getItem('authenticatedUser')
        return user === null ? false : true
    }
}

export default new AuthenticationService()
