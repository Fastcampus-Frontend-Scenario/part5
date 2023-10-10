import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/router';

import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';

import { TopBanner } from '../components/TopBanner';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
    useRouter: jest.fn()
}))

describe('<TopBanner>', () => {
    let mock: MockAdapter

    const successObj = {
        'result': 'OK',
        'data': {
            'imageSrc': '/banners/favor-electronic.png',
            'url': '/electronic?order=favor'
        }
    }

    const errObj = {
        'result': 'ERROR',
    }
    beforeEach(() => {
        mock = new MockAdapter(axios)
        mock.reset()
        mock.resetHistory()
    })

    describe('Positive case', () => {
        beforeEach(() => {
            mock.onGet('/api/ad-banner').reply(200, successObj)
        })

        it('should render top banner', async () => {
            render(<TopBanner />)

            const banner = await screen.findByTestId('top-banner')
            expect(banner).toBeInTheDocument()
        })

        it('should route to banner url', async () => {
            const user = userEvent.setup()
            const pushMock = jest.fn();

            (useRouter as jest.Mock).mockReturnValue({
                push: pushMock,
            })

            render(<TopBanner />)
            const banner = await screen.findByTestId('top-banner')

            await user.click(banner)
            expect(pushMock).toHaveBeenCalledWith(`/electronic?order=favor`)
        })
    })
    describe('Negative case', () => {
        it('should not render top banner', async () => {
            mock.onGet('/api/ad-banner').reply(200, errObj)
            render(<TopBanner />)
            await waitFor(() => expect(mock.history.get.length).toBe(1))

            expect(screen.queryByTestId('top-banner')).not.toBeInTheDocument()
        })
    })

})