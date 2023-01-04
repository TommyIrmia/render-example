const fs = require('fs')
var gCars = require('../data/car.json')

module.exports = {
    query,
    getById,
    save,
    remove
}

const PAGE_SIZE = 5
function query(filterBy = { txt: '' }) {
    const regex = new RegExp(filterBy.txt, 'i')
    var cars = gCars.filter(car => regex.test(car.vendor))

    if (filterBy.userId) {
        cars = cars.filter(car => filterBy.userId === car.owner._id)
    }
    if (filterBy.pageIdx !== undefined) {
        const startIdx = filterBy.pageIdx * PAGE_SIZE
        cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
    }
    return Promise.resolve(cars)
}

function getById(carId) {
    const car = gCars.find(car => car._id === carId)
    return Promise.resolve(car)
}


function remove(carId, user) {
    const idx = gCars.findIndex(car => car._id === carId)
    const car = gCars[idx]

    if (!_isAuthToEdit(car, user)) {
        return Promise.reject('Not your Car')
    }
    gCars.splice(idx, 1)
    return _saveCarsToFile()
}

function save(car, user) {

    if (car._id) {
        if (!_isAuthToEdit(car, user)) {
            return Promise.reject('Not your Car')
        }
        const idx = gCars.findIndex(c => c._id === car._id)
        gCars[idx] = car
    }
    else {
        car._id = _makeId()
        gCars.push(car)
    }
    return _saveCarsToFile().then(() => car)
}

function _saveCarsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gCars, null, 2)
        fs.writeFile('data/car.json', data, (err) => {
            if (err) return reject('Cannot save to file')
            resolve()
        })
    })
}

function _isAuthToEdit(car, user) {
    return car.owner._id === user._id
}

function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}