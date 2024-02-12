import { vi, beforeAll, afterAll } from 'vitest'
import { render, act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Shop from '../src/Components/Shop'
import Card from '../src/Components/Card'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

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
                        {
                            title: 'testTitle1',
                            image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
                            id: 0,
                            price: 5.5,
                        },
                        {
                            title: 'testTitle2',
                            image: 'https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg',
                            id: 1,
                            price: 10,
                        },
                    ])
                ),
        }

        fetchSpy.mockReturnValue(mockResolveValue)
    })
    afterAll(() => {
        fetchSpy.mockRestore()
    })
    it('render snapshot', async () => {
        const category = 'electronics'
        const { container } = render(
            <MemoryRouter initialEntries={[`/shop/${category}`]}>
                <Routes>
                    <Route
                        path="/shop/:category"
                        element={<Shop addCartItems={() => {}} />}
                    ></Route>
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))

        expect(container).toMatchSnapshot()
    })
    it('render correct number of products', async () => {
        const category = 'electronics'
        render(
            <MemoryRouter initialEntries={[`/shop/${category}`]}>
                <Routes>
                    <Route
                        path="/shop/:category"
                        element={<Shop addCartItems={() => {}} />}
                    ></Route>
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(2))

        const heading = screen.getAllByRole('heading')
        expect(heading.length).toBe(3)
        expect(heading[0].textContent).toBe('Electronics')
    })
})
