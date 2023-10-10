import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Counter from "../components/Counter"

test('render count: 5 after clicking the `apply` button ', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const valueInput = screen.getByRole('spinbutton')
    await user.type(valueInput, '5' )
    expect(valueInput).toHaveValue(5)

    const applyButton = screen.getByRole('button', {name: 'Apply'})
    await user.click(applyButton)

    const countElement = screen.getByRole('heading')
    expect(countElement).toHaveTextContent('5')


})

test('check focusing order ', async() => {
    const user = userEvent.setup()
    render(<Counter />)

    const increaseButton = screen.getByRole('button', { name: '+' })
    const valueInput = screen.getByRole('spinbutton')
    const applyButton = screen.getByRole('button', { name: 'Apply' })

    await user.tab()
    expect(increaseButton).toHaveFocus()

    await user.tab()
    expect(valueInput).toHaveFocus()

    await user.tab()
    expect(applyButton).toHaveFocus()
})

// Utility API - clear()
test('clearing textbox', async () => {
    userEvent.setup()
    render(<textarea defaultValue={'안녕하세요!'} />)

    const textBox = screen.getByRole('textbox')
    await userEvent.clear(textBox)
    expect(textBox).toHaveValue('')
})

// Utility API - selectOptions
test('selectOptions', async () => {
    userEvent.setup()
    render(
        <select multiple>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
        </select>,
    )

    await userEvent.selectOptions(screen.getByRole('listbox'), ['1', 'C'])

    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'A' }).selected).toBe(true)
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'B' }).selected).toBe(false)
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'C' }).selected).toBe(true)
})

// Utility API - deselectOptions()
test('deselectOptions', async () => {
    userEvent.setup()
    render(
        <select multiple>
            <option value="1">A</option>
            <option value="2" selected>
                B
            </option>
            <option value="3">C</option>
        </select>,
    )
    await userEvent.deselectOptions(screen.getByRole('listbox'), '2')
    expect(screen.getByText<HTMLOptionElement>('B').selected).toBe(false)
})