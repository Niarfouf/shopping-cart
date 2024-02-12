import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Error'
import Nav from './Components/Nav'
import Homepage from './Components/Homepage'
import Shop from './Components/Shop'
import Cart from './Components/Cart'
import './index.css'

export default function Router() {
    const [cartItems, setCartItems] = useState({})
    function addCartItems(item, quantity) {
        if (quantity > 0) {
            if (!cartItems[item.id]) {
                setCartItems({
                    ...cartItems,
                    [item.id]: { item: item, quantity: quantity },
                })
            } else {
                setCartItems({
                    ...cartItems,
                    [item.id]: {
                        item: item,
                        quantity: quantity + cartItems[item.id].quantity,
                    },
                })
            }
        }
    }
    function updateCartItems(item, quantity) {
        const newItems = { ...cartItems }
        if (quantity === 0) {
            delete newItems[item.id]
            setCartItems(newItems)
        } else {
            setCartItems({
                ...cartItems,
                [item.id]: {
                    item: item,
                    quantity: quantity,
                },
            })
        }
    }
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Nav cart={cartItems} />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Homepage /> },
                {
                    path: 'shop/:category',
                    element: <Shop addCartItems={addCartItems} />,
                },
                {
                    path: 'cart',
                    element: (
                        <Cart
                            deleteCartItems={updateCartItems}
                            cartItems={cartItems}
                        />
                    ),
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}
