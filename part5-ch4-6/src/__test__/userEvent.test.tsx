import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<Props> = ({ onClick }) => (
    <button onClick={onClick}>click me!</button>
)

test('trigger some awesome feature when clicking the button', async () => {
    const user = userEvent.setup()
    
    const clickFn = jest.fn()
    render(<Button onClick={clickFn} />)

    await user.click(screen.getByRole('button', { name: /click me!/i }))

    expect(clickFn).toBeCalledTimes(1)
})


// setup function
function setup(component: React.ReactElement) {
    return {
        user: userEvent.setup(),
        ...render(component),
    }
}

test('render with a setup function', async () => {
    const clickFn = jest.fn()

    const { user } = setup(<Button onClick={clickFn}/>)

    await user.click(screen.getByRole('button', { name: /click me!/i }))
    expect(clickFn).toBeCalledTimes(1)
})






