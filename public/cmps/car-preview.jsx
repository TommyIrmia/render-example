export function CarPreview({ car }) {
    return (
        <article>
            <h4>{car.vendor}</h4>
            <h1>🚘</h1>
            <p>Speed: <span>{car.speed.toLocaleString()}</span></p>
            <p>Owner: <span>{car.owner.fullname}</span></p>
        </article>
    )
}