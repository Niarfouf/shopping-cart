import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './Error'
import Nav from './Nav'
import Homepage from './Homepage'
import Shop from './Shop'
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Nav />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Homepage /> },
            {
                path: 'shop/:category',
                element: <Shop />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
