import { render, act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Homepage from '../src/Components/Homepage'
import { MemoryRouter } from 'react-router-dom'

describe('Homepage', () => {
    it('render page snapshot', () => {
        const { container } = render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot()
    })
    it('left arrow button works', async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )
        expect(screen.getByRole('heading').textContent).toMatch(/Electronics/i)
        const buttons = screen.getAllByRole('button')
        await user.click(buttons[0])
        expect(screen.getByRole('heading').textContent).toMatch(
            /Women's clothing/i
        )
    })
    it('right arrow button works', async () => {
        const user = userEvent.setup()
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )
        expect(screen.getByRole('heading').textContent).toMatch(/Electronics/i)
        const buttons = screen.getAllByRole('button')
        await user.click(buttons[1])
        expect(screen.getByRole('heading').textContent).toMatch(/Jewelery/i)
    })
    it('render heading and link and rotate every 3s', async () => {
        render(
            <MemoryRouter>
                <Homepage />
            </MemoryRouter>
        )

        expect(screen.getByRole('heading').textContent).toMatch(/Electronics/i)
        expect(screen.getByRole('link').textContent).toMatch(/Start shopping/i)
        await waitFor(
            () => {
                expect(screen.getByRole('heading').textContent).toMatch(
                    /Jewelery/i
                )
            },
            { timeout: 3000 }
        )
        await waitFor(
            () => {
                expect(screen.getByRole('heading').textContent).toMatch(
                    /Men's clothing/i
                )
            },
            { timeout: 3000 }
        )
        await waitFor(
            () => {
                expect(screen.getByRole('heading').textContent).toMatch(
                    /Women's clothing/i
                )
            },
            { timeout: 3000 }
        )
    }, 12000)
})
