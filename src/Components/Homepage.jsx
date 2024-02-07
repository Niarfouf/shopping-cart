import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
const refArray = [
    [0, 'electronics'],
    [1, 'jewelery'],
    [2, "men's clothing"],
    [3, "women's clothing"],
]
export default function Homepage() {
    const [active, setActive] = useState(0)
    function left() {
        setActive((active) => (active === 0 ? 3 : active - 1))
    }
    function right() {
        setActive((active) => (active === 3 ? 0 : active + 1))
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    useEffect(() => {
        const key = setInterval(() => {
            right()
        }, 3000)

        return () => {
            clearInterval(key)
        }
    }, [active])
    return (
        <>
            <div className={`caroussel image${active}`}>
                <div className="caroussel-buttons">
                    <button onClick={left} className="left-arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <title>menu-left</title>
                            <path d="M14,7L9,12L14,17V7Z" />
                        </svg>
                    </button>
                    <h1>{capitalizeFirstLetter(refArray[active][1])}</h1>
                    <button onClick={right} className="right-arrow">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <title>menu-right</title>
                            <path d="M10,17L15,12L10,7V17Z" />
                        </svg>
                    </button>
                </div>

                <Link
                    className="shop-link"
                    to={{
                        pathname: `shop/${refArray[active][1]}`,
                    }}
                >
                    Start shopping
                </Link>

                <div className="caroussel-info">
                    {refArray.map((ref) => {
                        return (
                            <div
                                key={ref}
                                className={
                                    active === ref[0] ? 'dot filled' : 'dot'
                                }
                                onClick={() => setActive(ref[0])}
                            ></div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}
