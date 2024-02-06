import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Error'
import Nav from './Nav'
import Homepage from './Homepage'
import Shop from './Shop'
import './index.css'

const Router = () => {
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
            element: <Nav deleteCartItems={updateCartItems} cart={cartItems} />,
            errorElement: <ErrorPage />,
            children: [
                { index: true, element: <Homepage /> },
                {
                    path: 'shop/:category',
                    element: <Shop addCartItems={addCartItems} />,
                },
            ],
        },
    ])

    return <RouterProvider router={router} />
}

export default Router
