import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cart from './Cart'
export default function Nav({ deleteCartItems, cart }) {
    const [dropDown, setDropDown] = useState('no')

    const [categories, setCategories] = useState([])

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await fetch(
                    'https://fakestoreapi.com/products/categories'
                )
                const data = await response.json()
                setCategories(data)
            } catch (e) {
                console.error(e)
            }
        }
        fetchCategories()
    }, [])
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    return (
        <>
            <header className="navbar">
                <nav>
                    <ul>
                        <li>
                            <Link to={``}>Home</Link>
                        </li>
                        <li
                            className="drop-down"
                            onMouseEnter={() => setDropDown('yes')}
                            onMouseLeave={() => setDropDown('no')}
                        >
                            <button className="drop-button">Shop</button>
                            <div
                                onClick={() => setDropDown('no')}
                                className={
                                    dropDown === 'yes'
                                        ? 'drop-content show'
                                        : 'drop-content'
                                }
                            >
                                {categories.map((category, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={{
                                                pathname: `shop/${category}`,
                                            }}
                                        >
                                            {capitalizeFirstLetter(category)}
                                        </Link>
                                    )
                                })}
                            </div>
                        </li>
                        <li>
                            <Link
                                to={{
                                    pathname: `cart`,
                                }}
                            >
                                Cart{' '}
                                <sup>
                                    {Object.entries(cart).reduce(
                                        (acc, current) =>
                                            acc + current[1].quantity,
                                        0
                                    )}
                                </sup>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main id="content">
                <Outlet />
            </main>
        </>
    )
}
