import { act, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

import ToastContainer from "../components/ToastContainer"

test('Toast test with real timer ', async () => {
    // case 1. use real timer, to be waited
    const user = userEvent.setup()
    render(<ToastContainer />)

    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(screen.queryByRole('alert')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByRole('alert'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
})





test('Toast test with fake timer', async () => {
    // case 2 instance test with jest fake timer
    jest.useFakeTimers()
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<ToastContainer />)

    const button = screen.getByRole('button')
    await user.click(button)

    expect(screen.queryByRole('alert')).toBeInTheDocument()
    act(()=> jest.advanceTimersByTime(1000))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    jest.useRealTimers()
})