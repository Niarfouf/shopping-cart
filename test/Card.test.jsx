import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Card from '../src/Components/Card'
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

describe('Card', () => {
    it('render match snapshot 1', () => {
        const { container } = render(
            <Card
                item={item1}
                addItemInList={() => {}}
                quantity={2}
                action={'test1'}
            />
        )

        expect(container).toMatchSnapshot()
    })
    it('render match snapshot 2', () => {
        const { container } = render(
            <Card
                item={item2}
                addItemInList={() => {}}
                quantity={4}
                action={'test2'}
            />
        )

        expect(container).toMatchSnapshot()
    })

    it('left button should change input when clicked', async () => {
        const user = userEvent.setup()
        render(
            <Card
                item={item1}
                addItemInList={() => {}}
                quantity={2}
                action={'Add'}
            />
        )

        const button = screen.getAllByRole('button')

        await user.click(button[0])
        const input = screen.getByDisplayValue('1')
        expect(input).toBeInTheDocument()
    })
    it('right button should change input when clicked', async () => {
        const user = userEvent.setup()
        render(
            <Card
                item={item1}
                addItemInList={() => {}}
                quantity={2}
                action={'Add'}
            />
        )

        const button = screen.getAllByRole('button')

        await user.click(button[1])
        const input = screen.getByDisplayValue('3')
        expect(input).toBeInTheDocument()
    })
    it('typing in input with keyboard should change input', async () => {
        const user = userEvent.setup()
        render(
            <Card
                item={item1}
                addItemInList={() => {}}
                quantity={2}
                action={'Add'}
            />
        )

        const input = screen.getByDisplayValue('2')
        await user.click(input)
        await user.clear(input)
        await user.keyboard('3')
        const newInput = screen.getByDisplayValue('3')
        expect(newInput).toBeInTheDocument()
    })
    it('Add button should call the addItemInList function when clicked', async () => {
        const addItemInList = vi.fn()
        const user = userEvent.setup()
        render(
            <Card
                item={item1}
                addItemInList={addItemInList}
                quantity={2}
                action={'Add'}
            />
        )

        const button = screen.getByRole('button', { name: 'Add' })

        await user.click(button)

        expect(addItemInList).toHaveBeenCalled()
    })
    it('should not call the addItemInList function when not clicked', async () => {
        const addItemInList = vi.fn()

        render(
            <Card
                item={item1}
                addItemInList={addItemInList}
                quantity={2}
                action={'Add'}
            />
        )

        expect(addItemInList).not.toHaveBeenCalled()
    })
})
