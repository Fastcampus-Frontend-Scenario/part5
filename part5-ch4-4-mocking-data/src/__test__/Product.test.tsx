import { render, screen, waitFor } from '@testing-library/react'
import Product from '../components/Product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockAxios = new MockAdapter(axios)
const mockProductData = {
    id: '123',
    name: 'test product',
    price: 1000,
    desc: 'product desc',
}

beforeEach(() => {
})

afterEach(() => {
    mockAxios.reset()
})

// happy case
it("render Mock Product data", async () => {
    mockAxios.onGet('/api/product/123').reply(200, mockProductData)

    render(<Product id='123' />)

    expect(mockAxios.history.get.length).toBe(1)
    const name = await screen.findByText(`이름 : ${mockProductData.name}`)
    expect(name).toBeInTheDocument()
    const age = await screen.findByText(`가격 : ${mockProductData.price}`)
    expect(age).toBeInTheDocument()
    const addr = await screen.findByText(`설명 : ${mockProductData.desc}`)
    expect(addr).toBeInTheDocument()
})

// bad case
it("render API error", async () => {
    mockAxios.onGet('/api/product/123').reply(401, 'unauthorized')

    render(<Product id='123' />)
    expect(mockAxios.history.get.length).toBe(1)
    // API 실패 이후 DOM update 대기
    await waitFor(() => expect(screen.getByRole('heading')).toBeInTheDocument());
})


