import { fireEvent, render, screen } from '@testing-library/react'
import { Counter } from '@/components/Counter'

describe('<Counter /> component', () => {
    let unmount: any
    beforeEach(() => {
        const rendered = render(<Counter />)
        unmount = rendered.unmount
    })
    it('render initial count', () => {
        const count = screen.getByRole('count')

        expect(count).toBeDefined()
        const countValue = Number.parseInt(count.textContent ?? '')
        expect(countValue).toBe(0)
    })
    it('render initial count with 1', async () => {
        unmount() // already rendered, so unmount and render once again
        render(<Counter initialCount={1} />)
        const count = screen.getByRole('count')
        expect(count.textContent).toBe('1')
    })
    it('click increase work', () => {
        const count = screen.getByRole('count')
        const increaseCount = screen.getByRole('button', { name: '+' })

        fireEvent.click(increaseCount)
        expect(count.textContent).toBe('1')
    })
    it('click decrease work', () => {
        const count = screen.getByRole('count')
        const decreaseCount = screen.getByRole('button', { name: '-' })

        fireEvent.click(decreaseCount)
        expect(count.textContent).toBe('-1') // -1을 허용할까요?
    })

    it('click reset work', () => {
        const count = screen.getByRole('count')
        const resetButton = screen.getByRole('button', { name: 'reset' })

        fireEvent.click(resetButton)
        expect(count.textContent).toBe('0')
    })
})
