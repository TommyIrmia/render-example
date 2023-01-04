import { CarPreview } from "./car-preview.jsx"

const { Link } = ReactRouterDOM

export function CarList({ cars, onRemoveCar, onEditCar }) {
    return (
        <ul className="car-list">
            {cars.map((car) => (
                <li className="car-preview" key={car._id}>
                    <CarPreview car={car} />
                    <div>
                        <button onClick={() => onRemoveCar(car._id)}>x</button>
                        <button onClick={() => onEditCar(car)}>Edit</button>
                    </div>
                    <Link to={`/car/${car._id}`}>Details</Link>
                </li>
            ))}
        </ul>
    )
}