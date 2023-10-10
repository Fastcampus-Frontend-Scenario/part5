import DataLists from '../components/DataLists'
import { createRenderer } from 'react-test-renderer/shallow'

describe('DataLists component', () => {
    // BAD - only snapshot in the test
    it('renders single user without posts and with single_user class', () => {
        const users = ['user1']
        const renderer = createRenderer()

        renderer.render(<DataLists users={users} />)
        expect(renderer.getRenderOutput()).toMatchSnapshot()
    })


})