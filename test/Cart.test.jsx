import { vi, beforeAll, afterAll } from 'vitest'
import { render, act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Cart from '../src/Components/Cart'
import Card from '../src/Components/Card'
import { MemoryRouter } from 'react-router-dom'

const item1 = {
    title: 'testTitle1',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    id: 0,
    price: 5.5,
}
const item2 = {
    title: 'testTitle2',
    image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
    id: 1,
    price: 10,
}
const cart = {
    0: { item: item1, quantity: 1 },
    1: { item: item2, quantity: 2 },
}
const cart2 = {
    0: { item: item1, quantity: 5 },
    1: { item: item2, quantity: 2 },
}

describe('Cart', () => {
    it('render snapshot', () => {
        const { container } = render(
            <Cart cartItems={cart} deleteCartItems={() => {}} />
        )
        expect(container).toMatchSnapshot()
    })
    it('render correct header', () => {
        render(<Cart cartItems={cart} deleteCartItems={() => {}} />)

        expect(screen.getAllByRole('heading')[0].textContent).toMatch(/Cart/i)
    })
    it('render correct number of items', () => {
        render(<Cart cartItems={cart} deleteCartItems={() => {}} />)

        expect(screen.getAllByRole('heading').length).toBe(3)
    })
    it('render correct total price', () => {
        render(<Cart cartItems={cart} deleteCartItems={() => {}} />)

        expect(screen.getByText('Total price = 25.5 €')).toBeInTheDocument()
    })
})
