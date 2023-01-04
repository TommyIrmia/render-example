export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedInUser'))
}

function login({ username, password }) {
    return axios.post('/api/login', { username, password })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user))
            return user
        })
}

function signup({ username, password, fullname }) {
    return axios.post('/api/signup', { username, password, fullname })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedInUser', JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/logout')
        .then(() => {
            sessionStorage.removeItem('loggedInUser')
        })
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

