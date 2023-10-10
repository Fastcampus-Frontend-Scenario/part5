import { useRouter } from 'next/router';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchBar } from '../components/SearchBar';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('<SearchBar>', () => {
    let user: UserEvent
    beforeEach(() => {
        user = userEvent.setup()
    })
    it('should render placeholder `Search`', () => {
        render(<SearchBar />)
        const input = screen.getByPlaceholderText('Search')
        expect(input).toBeInTheDocument()
    })
    it('Show text when input text to input field', async () => {
        render(<SearchBar />)
        const input = screen.getByRole<HTMLInputElement>('textbox')

        await user.type(input, 'keyword')
        expect(input.value).toBe('keyword')
    })

    it('Show X button when input field has text', async () => {
        render(<SearchBar />)
        // not exist when it was default state.
        const input = screen.getByRole<HTMLInputElement>('textbox')
        expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument()

        await user.type(input, 'a')
        expect(screen.getByTestId('CloseIcon')).toBeInTheDocument()
    })


    it('Clicking X button will clear text', async () => {
        render(<SearchBar />)
        const input = screen.getByRole<HTMLInputElement>('textbox')
        await user.type(input, 'a')
        
        await user.click(screen.getByTestId('CloseIcon'))
        expect(input.value).toBe('')
    })
    it('After clicking X button, button will be disappeared', async () => {
        render(<SearchBar />)
        const input = screen.getByRole<HTMLInputElement>('textbox')
        await user.type(input, 'a')

        await user.click(screen.getByTestId('CloseIcon'))
        
        expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument()
    })

    it('Route to search page when submit input text', async () => {
        const pushMock = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        })

        render(<SearchBar />)
        // not exist when it was default state.
        const input = screen.getByRole<HTMLInputElement>('textbox')
        expect(screen.queryByTestId('CloseIcon')).not.toBeInTheDocument()

        const typed = 'inputText'
        await user.type(input, `${typed}{enter}`)

        expect(pushMock).toHaveBeenCalledWith(`/search?q=${typed}`)
    })

})