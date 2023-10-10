import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MouseEventHandler, PropsWithChildren } from 'react'

type Props = {
    onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<Props> = ({ onClick }) => (
    <button onClick={onClick}>click me!</button>
)

// Testing pointer actions
test('Test pointer user events- move', async () => {
    const user = userEvent.setup()
    const overFn = jest.fn()
    render(<button onMouseOver={overFn}>Click me!</button>)

    expect(overFn).toBeCalledTimes(0) // 기본값, over 없음

    await user.pointer({
        target: screen.getByRole('button', { name: /click me!/i })
    }) // 버튼으로 마우스 이동 
    expect(overFn).toBeCalledTimes(1) // over 이벤트 발생
})

// Testing pointer actions
test('Test pointer user events', async () => {
    const user = userEvent.setup()
    const clickFn = jest.fn()

    render(<Button onClick={clickFn} />)

    const clickAct = {
        keys: '[MouseLeft]',
        target: screen.getByRole('button', { name: /click me!/i })
    }
    await user.pointer(clickAct) // click 1회
    expect(clickFn).toBeCalledTimes(1)

    await user.pointer(new Array(3).fill(clickAct)) // click 3회
    expect(clickFn).toBeCalledTimes(4)
})

// Testing delayed userEvent
const Dummy: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const clickHandler = () => {
        setTimeout(() => {
            onClick();
        }, 500);
    };
    return <button onClick={clickHandler}>Click me!</button>;
};

test('test delayed event', async () => {
    // arrange 
    jest.useFakeTimers()

    // test fails, that userEvent didn't mocking the timer
    // const user = userEvent.setup() 

    // test runs correctly with advancedTimers
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    const clickFn = jest.fn()

    // act
    render(<Dummy onClick={clickFn} />)
    await user.click(screen.getByRole('button', { name: /click me!/i }))

    // assert
    expect(clickFn).not.toBeCalled() // 시간이 지나기 전까지는 동작 안함

    jest.advanceTimersByTime(50) // 50ms 이후
    expect(clickFn).not.toBeCalled() // 호출 안됨


    jest.advanceTimersByTime(450) // 50 + 450 = 500ms 이후
    expect(clickFn).toBeCalled() // 호출됨
    jest.useRealTimers()
})