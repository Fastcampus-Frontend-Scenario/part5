import { render, screen } from '@testing-library/react'
import User from '../components/User'

const mockUserData = {
    id: '123',
    name: 'John Doe',
    age: 23,
    address: 'Seoul',
}

afterEach(() => {
    jest.resetAllMocks()
})

// happy case
it("render Mock User data", async () => {
    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockUserData)
    })) as jest.Mock

    render(<User id='123' />)

    expect(fetch).toHaveBeenCalledTimes(1)
    const name = await screen.findByText(`이름 : ${mockUserData.name}`)
    expect(name).toBeInTheDocument()
    const age = await screen.findByText(`나이 : ${mockUserData.age}`)
    expect(age).toBeInTheDocument()
    const addr = await screen.findByText(`주소 : ${mockUserData.address}`)
    expect(addr).toBeInTheDocument()
})

// bad case
it("render API error", async () => {
    global.fetch = jest.fn(() => {throw new Error('unauthorized')}) as jest.Mock

    render(<User id='123' />)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('heading')).toBeInTheDocument()
})
