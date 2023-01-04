const express = require('express')
const userService = require('../../services/user.service')
const carService = require('../../services/car.service')
const router = express.Router()

module.exports = router

// LIST
router.get('/', (req, res) => {
    const filterBy = { txt: req.query.txt || '' }

    if (req.query.pageIdx) filterBy.pageIdx = req.query.pageIdx
    if (req.query.userId) filterBy.userId = req.query.userId

    carService.query(filterBy)
        .then(cars => res.send(cars))
})

// READ
router.get('/:carId', (req, res) => {
    const { carId } = req.params
    carService.getById(carId)
        .then(car => res.send(car))
})

// CREATE
router.post('/', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot add car')

    console.log('POST REQ from user', loggedinUser)

    const car = req.body
    console.log('car', car)
    car.owner = loggedinUser
    carService.save(car)
        .then(car => res.send(car))
})

// UPDATE
router.put('/:carId', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot update car')

    const car = req.body
    carService.save(car, loggedinUser)
        .then(car => res.send(car))
        .catch((err) => {
            console.log('error', err)
            res.status(400).send('Cannot update car')
        })
})

// DELETE
router.delete('/:carId', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot remove car')

    const { carId } = req.params
    carService.remove(carId, loggedinUser)
        .then(() => res.send({ msg: 'Removed succesfully' }))
        .catch((err) => {
            console.log('error', err)
            res.status(400).send('Cannot remove car')
        })
})

