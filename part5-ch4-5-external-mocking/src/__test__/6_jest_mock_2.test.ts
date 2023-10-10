import def, * as calculator from '../utils/calculator'
jest.mock('../utils/calculator', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => true),
        add: jest.fn().mockImplementation((a: number, b: number) => a - b),
    }
});

const doAdd = (a: number, b: number) => {
    return calculator.add(a, b)
}

test("Mock function", () => {
    const result = doAdd(1, 2)
    expect(calculator.add).toHaveBeenCalledWith(1, 2)
    expect(result).toBe(-1) // mocked with new Implementation

    // const result2 = doSub(2,1)
    // expect(calculator.subtract).toHaveBeenCalledWith(2, 1)
    // expect(result2).toBe(1) // mocked with new Implementation
})

const doSub = (a: number, b: number) => {
    // TypeError: _calculator.subtract is not a function
    return calculator.subtract(a, b)
}

test("Mock function - subtract", () => {
    const result = doSub(2,1)
    expect(calculator.subtract).toHaveBeenCalledWith(2, 1)
    expect(result).toBe(1)
})







test("Mock function - default", () => {
    const result = def()
    expect(def).toHaveBeenCalled()
    expect(result).toBe(true)
})