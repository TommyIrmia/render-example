import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const carService = {
    getById,
    query,
    remove,
    save
}

const KEY = 'car'

function getById(carId) {
    return asyncStorageService.get(KEY, carId)
}

function remove(carId) {
    return asyncStorageService.remove(KEY, carId)
}

function save(car) {
    if (car._id) return asyncStorageService.put(KEY, car)
    else return asyncStorageService.post(KEY, car)
}

function query(filterBy) {

    return asyncStorageService.query(KEY)
        .then(cars => {
            if (!cars || !cars.length) {
                cars = _createCars()
                return asyncStorageService.postMany(KEY, cars)
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
            return cars
        })
}

function _createCar(vendor, speed = utilService.getRandomIntInclusive(1, 200)) {
    return {
        vendor,
        speed,
        desc: utilService.makeLorem()
    }
}

function _createCars() {
    var vendors = ['audi', 'fiat', 'suzuki', 'honda', 'mazda']
    const cars = []
    for (let i = 0; i < 20; i++) {
        const vendor = vendors[utilService.getRandomIntInclusive(0, vendors.length - 1)]
        cars.push(_createCar(vendor))
    }
    return cars
}
