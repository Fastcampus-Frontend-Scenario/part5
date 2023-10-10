import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';

import { screen } from '@testing-library/dom';
import { act, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TimeDeal } from '../components/TimeDeal';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('<TimeDeal>', () => {
    let mock: MockAdapter
    beforeEach(() => {
        mock = new MockAdapter(axios)
        mock.reset()
        mock.resetHistory()
    })
    describe('Positive case', ()  => {
        beforeEach(() => {
            const endDate = new Date()
            endDate.setHours(endDate.getHours() + 1)
            endDate.setMilliseconds(endDate.getMilliseconds() + 600)
            const successObj = {
                'result': 'OK',
                'data': {
                    'items': [
                        { 'productId': '1', 'name': 'Clothes', 'price': 30000, 'discount': 3000 },
                        { 'productId': '2', 'name': 'earphone', 'price': 100000, 'discount': 25000 },
                        { 'productId': '3', 'name': 'notebook', 'price': 1000000, 'discount': 250000 }
                    ],
                    'dealEnded': endDate.toString()
                }
            }
            mock.onGet('/api/timedeal').reply(200, successObj)
        })
        it('should render TimeDeal', async () => {
            render(<TimeDeal />)

            const timeDeal = await screen.findByTestId('time-deal')
            expect(timeDeal).toBeInTheDocument()
        })

        it('should render remainedTimeCorrectly', async () => {
            render(<TimeDeal />)

            await screen.findByTestId('time-deal')
            const hourElement = screen.getByTestId('remain-hour')
            const minElement = screen.getByTestId('remain-min')
            const secElement = screen.getByTestId('remain-sec')
            expect(hourElement.textContent).toBe('01')
            expect(minElement.textContent).toBe('00')
            expect(secElement.textContent).toBe('00')
        })
        it('should time deal timer runs correctly', async () => {
            jest.useFakeTimers();

            render(<TimeDeal />)

            await screen.findByTestId('time-deal')
            const hourElement = screen.getByTestId('remain-hour')
            const minElement = screen.getByTestId('remain-min')
            const secElement = screen.getByTestId('remain-sec')


            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(hourElement.textContent).toBe('00')
            expect(minElement.textContent).toBe('59')
            expect(secElement.textContent).toBe('59')

            act(() => {
                jest.advanceTimersByTime(1000);
            });
            expect(hourElement.textContent).toBe('00')
            expect(minElement.textContent).toBe('59')
            expect(secElement.textContent).toBe('58')
            jest.useRealTimers()
        })

        it('should render timedeal products correctly', async () => {
            render(<TimeDeal />)

            await screen.findByTestId('time-deal')
            const container = screen.getByTestId('time-deal-product-container')

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
            render(<TimeDeal />)

            await screen.findByTestId('time-deal')
            await user.click(screen.getByText('Clothes'))
            expect(pushMock).toHaveBeenCalledWith(`/product/1`)
        })
    })
    describe('Negative case', () => {
        it('should not render top banner', async () => {
            const mock = new MockAdapter(axios)
            const errObj = {
                'result': 'ERROR',
            }
            mock.onGet('/api/timedeal').reply(200, errObj)
            render(<TimeDeal />)
            await waitFor(() => expect(mock.history.get.length).toBe(1))

            expect(screen.queryByTestId('time-deal')).not.toBeInTheDocument()
            mock.resetHistory()
        })
    })
   
})