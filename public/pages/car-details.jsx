import { carService } from '../services/car.service.js'

const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

export function CarDetails() {

    const [car, setCar] = useState(null)
    const { carId } = useParams()

    useEffect(() => {
        carService
            .getById(carId)
            .then(setCar)
    }, [carId])

    return car && (
        <div>
            <h3>Car Details 🐛🐛</h3>
            <h4>{car.title}</h4>
            <p>Speed: <span>{car.speed}</span></p>
            <p>Owner: <span>{car.owner.fullname}</span></p>
            <Link to={"/car"}>Back to List</Link>
        </div>
    )
}