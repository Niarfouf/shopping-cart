import { Outlet, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Cart from './Cart'
export default function Nav() {
    const [cartOpen, setCartOpen] = useState('no')
    const [shoppingList, setShoppingList] = useState([])
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
    return (
        <>
            <header id="navbar">
                <nav>
                    <ul>
                        <li>
                            <Link to={``}>Home</Link>
                        </li>
                        <li className="drop-down">
                            <button className="drop-button">Shop</button>
                            <div className="drop-content">
                                {categories.map((category, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`shop/${category}`}
                                        >
                                            {category}
                                        </Link>
                                    )
                                })}
                            </div>
                        </li>
                    </ul>
                    <button onClick={handleCart}>
                        Cart {shoppingList.length}
                    </button>
                </nav>
            </header>
            <Cart cartInfo={cartOpen} />
            <main id="content">
                <Outlet />
            </main>
        </>
    )
}
