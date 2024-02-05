export default function Card({ title, price, description, imageUrl }) {
    return (
        <>
            <div className="card">
                <img className="item-image" alt={title} src={imageUrl}></img>
                <h3 className="title">{title}</h3>
                <p>{description}</p>
                <input type="number"></input>
                <button>Add</button>
                <p>{price}</p>
            </div>
        </>
    )
}
