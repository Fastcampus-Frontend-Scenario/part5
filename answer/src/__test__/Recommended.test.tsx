import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';

import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Recommended } from '../components/Recommended';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('<Recommended>', () => {
    describe('Positive case', () => {
        let mock: MockAdapter
        beforeEach(() => {
            mock = new MockAdapter(axios)
            mock.resetHistory()
            mock.reset()
            const successObj = {
                'result': 'OK',
                'data': {
                    'productList': [
                        { 'productId': '1', 'name': 'Clothes', 'price': 30000, 'discount': 3000 },
                        { 'productId': '2', 'name': 'earphone', 'price': 100000, 'discount': 25000 },
                        { 'productId': '3', 'name': 'notebook', 'price': 1000000, 'discount': 250000 }
                    ]
                }
            }
            mock.onGet('/api/recommended').reply(200, successObj)
        })
        it('should render Recommended', async () => {
            render(<Recommended />)

            const recommended = await screen.findByTestId('recommended')
            expect(recommended).toBeInTheDocument()
        })

        it('should render recommended products correctly', async () => {
            render(<Recommended />)

            await screen.findByTestId('recommended')
            const container = screen.getByTestId('recommended-product-list')

            expect(container.childNodes.length).toBe(3)

            expect(screen.getByText('Clothes')).toBeInTheDocument()
            expect(screen.getByText('earphone')).toBeInTheDocument()
            expect(screen.getByText('notebook')).toBeInTheDocument()
        })

        it('should route to correct product page when item clicked', async () => {
            const user = userEvent.setup()
            const pushMock = jest.fn();

            (useRouter as jest.Mock).mockReturnValue({
                push: pushMock,
            })

            render(<Recommended />)

            await screen.findByTestId('recommended')
            await user.click(screen.getByText('Clothes'))
            expect(pushMock).toHaveBeenCalledWith(`/product/1`)
        })

        it('Render correctly', async () => {
            const { container } = render(<Recommended />)
            await screen.findByTestId('recommended')

            expect(container).toMatchSnapshot()
        })
    })
    describe('Negative case', () => {

        it('should not render top banner', async () => {
            const mock = new MockAdapter(axios)
            const errObj = {
                'result': 'ERROR',
            }
            mock.onGet('/api/recommended').reply(200, errObj)
            render(<Recommended />)
            await waitFor(() => expect(mock.history.get.length).toBe(1))

            expect(screen.queryByTestId('recommended')).not.toBeInTheDocument()
            mock.resetHistory()
        })
    })
    
})