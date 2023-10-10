import { Header } from "../components/Header";
import { render } from "@testing-library/react";
import { useRouter } from 'next/router';
import userEvent from '@testing-library/user-event'
import { afterEach } from "node:test";

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('<Header>', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })
    it('should render menu', () => {
        const { getByTestId } = render(<Header />)
        const menuButton = getByTestId('menu-button')
        expect(menuButton).toBeInTheDocument()
    })
    it('should render cart', () => {
        const { getByTestId } = render(<Header />)
        const cartButton = getByTestId('cart-button')
        expect(cartButton).toBeInTheDocument()
    })
    it('should render mypage', () => {
        const { getByTestId } = render(<Header />)
        const myPageButton = getByTestId('mypage-button')
        expect(myPageButton).toBeInTheDocument()
    })
    it ('should router push /cart when cart button cliked', async () => {
        const user = userEvent.setup()
        const pushMock = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        })

        const { getByTestId } = render(<Header />)
        const cartButton = getByTestId('cart-button')
        await user.click(cartButton)
        expect(pushMock).toHaveBeenCalledWith('/cart')
        
    })

    // mypage test: route to /mypage
    it('should router push /mypage when mypage button cliked', async () => {
        const user = userEvent.setup()
        const pushMock = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({
            push: pushMock,
        })

        const { getByTestId } = render(<Header />)
        const myPageButton = getByTestId('mypage-button')
        await user.click(myPageButton)
        expect(pushMock).toHaveBeenCalledWith('/mypage')
    })
})