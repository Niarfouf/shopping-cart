import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cart from './Cart'
export default function Nav({ deleteCartItems, cart }) {
    const [cartOpen, setCartOpen] = useState('no')
    const [dropDown, setDropDown] = useState('no')

    const [categories, setCategories] = useState([])
    function handleCart() {
        if (cartOpen === 'no') {
            setCartOpen('yes')
        } else {
            setCartOpen('no')
        }
    }

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
                            <button
                                className="cart-button"
                                onClick={handleCart}
                            >
                                Cart {Object.entries(cart).length}
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>
            <Cart
                cartItems={cart}
                cartInfo={cartOpen}
                handleCart={handleCart}
                deleteCartItems={deleteCartItems}
            />
            <main id="content">
                <Outlet />
            </main>
        </>
    )
}
