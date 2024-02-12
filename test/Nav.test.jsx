import { vi, beforeAll, afterAll } from 'vitest'
import { render, act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Nav from '../src/Components/Nav'
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

describe('Nav', () => {
    //Spy on the global fetch function
    const fetchSpy = vi.spyOn(window, 'fetch')

    //Run before all the tests
    beforeAll(() => {
        //Mock the return value of the global fetch function
        const mockResolveValue = {
            ok: true,
            json: () =>
                new Promise((resolve) =>
                    resolve([
                        'electronics',
                        'jewelery',
                        "men's clothing",
                        "women's clothing",
                    ])
                ),
        }

        fetchSpy.mockReturnValue(mockResolveValue)
    })
    afterAll(() => {
        fetchSpy.mockRestore()
    })
    it('render snapshot', async () => {
        const { container } = render(
            <MemoryRouter>
                <Nav deleteCartItems={() => {}} cart={cart} />
            </MemoryRouter>
        )
        await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))

        expect(container).toMatchSnapshot()
    })
    it('render correct links', async () => {
        render(
            <MemoryRouter>
                <Nav deleteCartItems={() => {}} cart={cart} />
            </MemoryRouter>
        )
        await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2))

        const links = screen.getAllByRole('link')
        expect(links.length).toBe(6)
    })
    it('render correct cart number', async () => {
        render(
            <MemoryRouter>
                <Nav deleteCartItems={() => {}} cart={cart2} />
            </MemoryRouter>
        )
        await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(3))

        expect(screen.getByText('7')).toBeInTheDocument()
    })
})
