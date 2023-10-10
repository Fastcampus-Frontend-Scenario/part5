import { render, screen, fireEvent } from '@testing-library/react'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>
}
const Button: React.FC<PropsWithChildren<Props>> = ({ onClick, children }) => (
    <button onClick={onClick}>{children}</button>
)

test('check onclick called once when button clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)

    fireEvent.click(screen.getByText(/click me/i))
    // expect(handleClick).toHaveBeenCalledTimes(0)
    expect(handleClick).toBeCalled()
})