import { useEffect, useState } from 'react'
export default function Card({ item, addItemInList, quantity = 0 }) {
    const [input, setInput] = useState(0)
    function left() {
        setInput((input) => (input > 0 ? input - 1 : input))
    }
    function right() {
        setInput((input) => input + 1)
    }
    useEffect(() => {
        setInput(quantity)
    }, [quantity])
    return (
        <>
            <div className="card">
                <img
                    className="item-image"
                    alt={item.title}
                    src={item.image}
                ></img>
                <h3 className="title">{item.title}</h3>

                <div>
                    <div className="add-container">
                        <label htmlFor={item.id}>Quantity :</label>
                        <button onClick={left} className="left-arrow-input">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <title>menu-left</title>
                                <path d="M14,7L9,12L14,17V7Z" />
                            </svg>
                        </button>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value * 1)}
                            type="text"
                            inputMode="numeric"
                            name="quantity"
                            id={item.id}
                        ></input>
                        <button onClick={right} className="right-arrow-input">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <title>menu-right</title>
                                <path d="M10,17L15,12L10,7V17Z" />
                            </svg>
                        </button>
                        <button
                            className="add-button"
                            onClick={() => addItemInList(item, input)}
                        >
                            Add
                        </button>
                    </div>
                    <p className="price">{item.price}€</p>
                </div>
            </div>
        </>
    )
}
