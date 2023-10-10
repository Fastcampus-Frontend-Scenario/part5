import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import DebounceInput from "../components/DebounceInput"

test('debouncing test with fake timer', async () => {
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<DebounceInput />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'a')

    expect(screen.queryByText('a')).not.toBeInTheDocument()
    act(() => jest.advanceTimersByTime(500))

    expect(screen.queryByText('a')).toBeInTheDocument()

    await user.type(input, 'b')
    expect(screen.queryByText('a')).toBeInTheDocument()

    await user.type(input, 'c')
    expect(screen.queryByText('a')).toBeInTheDocument()

    act(() => jest.advanceTimersByTime(500))
    expect(screen.queryByText('abc')).toBeInTheDocument()

    jest.useRealTimers()
})
