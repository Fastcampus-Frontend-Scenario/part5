import DataLists from '../components/DataLists'
import { createRenderer } from 'react-test-renderer/shallow'
//only snapshot assertions

describe('DataLists component', () => {
    // BAD - generic and not helpful test name
    it('renders data list correctly', () => {
        const renderer = createRenderer()

        const users = ['user1']
        renderer.render(<DataLists users={users} />)
        expect(renderer.getRenderOutput()).toMatchSnapshot()
    })

    // LITTLE BETTER - test name at least suggests what is the reason of the test
    it('renders single user without posts and with single_user class', () => {
        const renderer = createRenderer()
        const users = ['user1']
        renderer.render(<DataLists users={users} />)
        expect(renderer.getRenderOutput()).toMatchSnapshot()
    })
})