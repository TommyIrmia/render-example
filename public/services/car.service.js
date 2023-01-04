export const carService = {
    query,
    getById,
    remove,
    save
}

const BASE_URL = `/api/car/`

function query(filterBy = { txt: '' }) {
    return axios.get(BASE_URL, { params: filterBy }).then(res => res.data)
}

function getById(carId) {
    return axios.get(BASE_URL + carId).then(res => res.data)
}

function remove(carId) {
    return axios.delete(BASE_URL + carId).then(res => res.data)
}

function save(car) {
    return car._id ? _update(car) : _add(car)
}

function _add(car) {
    return axios.post(BASE_URL, car).then(res => res.data)
}

function _update(car) {
    return axios.put(BASE_URL + car._id, car).then(res => res.data)
}