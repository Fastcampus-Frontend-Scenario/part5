import { render, screen } from '@testing-library/react'
import User from '../components/User'
import fetchMock from "jest-fetch-mock"


const mockUserData = {
    id: '123',
    name: 'John Doe',
    age: 23,
    address: 'Seoul',
}

beforeAll(() => fetchMock.enableMocks())
beforeEach(() => {
    fetchMock.resetMocks()
})
afterAll(() => fetchMock.disableMocks())

// happy case
it("render Mock User data", async () => {
    fetchMock.mockResponse(JSON.stringify(mockUserData))

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
    fetchMock.mockReject(() => {throw new Error('unauthorized')})

    render(<User id='123' />)
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('heading')).toBeInTheDocument()
})
