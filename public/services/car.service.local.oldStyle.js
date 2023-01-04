import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'

export const carService = {
    getById,
    query,
    remove,
    save
}

const KEY = 'carsDB'
var gVendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']

function query(filterBy) {
    let cars = _loadFromStorage()
    if (!cars) {
        cars = _createCars()
        _saveToStorage(cars)
    }

    if (filterBy) {
        let { vendor, minSpeed, maxSpeed } = filterBy
        if (!minSpeed) minSpeed = 0;
        if (!maxSpeed) maxSpeed = Infinity
        cars = cars.filter(car => (
            car.vendor.includes(vendor) &&
            car.speed >= minSpeed &&
            car.speed <= maxSpeed
        ))
    }

    return Promise.resolve(cars)
}

function getById(carId) {
    if (!carId) return Promise.resolve(null)
    const cars = _loadFromStorage()
    const car = cars.find(car => carId === car._id)
    return Promise.resolve(car)
}

function remove(carId) {
    // return Promise.reject('Not now!!!')
    let cars = _loadFromStorage()
    cars = cars.filter(car => car._id !== carId)
    _saveToStorage(cars)
    return Promise.resolve()
}

function save(car) {
    if (car._id) return _update(car)
    else return _add(car)
}

function _add({ vendor, speed }) {
    let cars = _loadFromStorage()
    const car = _createCar(vendor, speed)
    cars = [car, ...cars]
    _saveToStorage(cars)
    return Promise.resolve(car)
}

function _update(carToUpdate) {
    let cars = _loadFromStorage()
    cars = cars.map(car => car._id === carToUpdate._id ? carToUpdate : car)
    _saveToStorage(cars)
    return Promise.resolve(carToUpdate)
}

function getVendors() {
    return gVendors
}

function _createCar(vendor, speed = utilService.getRandomIntInclusive(1, 200)) {
    return {
        _id: utilService.makeId(),
        vendor,
        speed,
        desc: utilService.makeLorem()
    }
}

function _createCars() {
    const cars = []
    for (let i = 0; i < 20; i++) {
        const vendor = gVendors[utilService.getRandomIntInclusive(0, gVendors.length - 1)]
        cars.push(_createCar(vendor))
    }
    return cars
}

function _saveToStorage(cars) {
    storageService.saveToStorage(KEY, cars)
}

function _loadFromStorage() {
    return storageService.loadFromStorage(KEY)
}