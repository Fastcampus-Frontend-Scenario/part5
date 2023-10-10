import { render, screen } from '@testing-library/react'

import DataLists from '../components/DataLists'
import { createRenderer } from 'react-test-renderer/shallow'

describe('DataLists component', () => {
    // GOOD - test with manual assertions and snapshot to check for regressions
    it('renders single user without posts and with single_user class', () => {
        const users = ['user1']
        const renderer = createRenderer()

        render(<DataLists users={users} />)

        expect(screen.getByText('user1')).toBeInTheDocument()
        expect(screen.getByText('user1')).toHaveClass('single_user')

        renderer.render(<DataLists users={users} />)
        expect(renderer.getRenderOutput()).toMatchSnapshot()
    })
})