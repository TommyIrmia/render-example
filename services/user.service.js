const fs = require('fs')
const Cryptr = require('cryptr')
const cryptr = new Cryptr('secret-puk-xyz-123')
const utilService = require('./util.service')
const gUsers = require('../data/user.json')

module.exports = {
    signup,
    getById,
    checkLogin,
    getLoginToken,
    validateToken
}

function signup({ username, password, fullname }) {
    const userExist = gUsers.find(user => user.username === username)
    if (userExist) return Promise.reject('Username is taken')

    const user = {
        _id: utilService.makeId(),
        username,
        fullname,
        password,
        score: 100
    }
    gUsers.push(user)
    return _saveUsersToFile().then(() => user)
}

function getById(userId) {
    const user = gUsers.find(user => user._id === userId)
    return Promise.resolve(user)
}

function checkLogin(credentials) {
    var user = gUsers.find(user =>
        user.username === credentials.username &&
        user.password === credentials.password)

    if (user)  {
        user = {
            _id : user._id,
            fullname : user.fullname,
        }
    }
    return Promise.resolve(user)
}

function getLoginToken(user) {
    return cryptr.encrypt(JSON.stringify(user))
}

function validateToken(loginToken) {
    try {
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

function _saveUsersToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/user.json', JSON.stringify(gUsers, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file')
            } else {
                console.log('Wrote Successfully!')
                resolve()
            }
        })
    })
}


