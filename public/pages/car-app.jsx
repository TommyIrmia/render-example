import { CarList } from "../cmps/car-list.jsx"
import { carService } from "../services/car.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React

export function CarApp() {

    const [cars, setCars] = useState([])
    const [filterBy, setFilterBy] = useState({ txt: '' })

    useEffect(() => {
        carService.query(filterBy).then(setCars)
    }, [filterBy])

    function onSetFilterBy({ target }) {
        setFilterBy({ txt: target.value })
    }

    function onAddCar() {
        const car = {
            vendor: prompt('Vendor?', 'SomeCar'),
            speed: +prompt('Speed?', 12345),
        }
        carService.save(car)
            .then(savedCar => {
                const updatedCars = [...cars, savedCar]
                setCars(updatedCars)
                showSuccessMsg('Car added')
            })
            .catch((err) => { showErrorMsg('Cannot add car') })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                const updatedCars = cars.filter(car => car._id !== carId)
                setCars(updatedCars)
                showSuccessMsg('Car removed')
            })
            .catch(() => { showErrorMsg('Cannot remove car') })
    }

    function onEditCar(car) {
        const speed = +prompt('New speed?')
        if (!speed) return

        carService.save({ ...car, speed })
            .then(savedCar => {
                const updatedCars = cars.map(car => car._id === savedCar._id ? savedCar : car)
                setCars(updatedCars)
                showSuccessMsg('Car saved')
            })
            .catch((err) => { showErrorMsg('Cannot edit car') })
    }

    return (
        <main>
            <h3>Cars App</h3>
            <section>
                <button onClick={onAddCar}>Add Car ⛐</button>
                <input
                    placeholder="Search for car"
                    type="text"
                    onChange={onSetFilterBy}
                />
                <CarList
                    cars={cars}
                    onRemoveCar={onRemoveCar}
                    onEditCar={onEditCar}
                />
            </section>
        </main>
    )
}