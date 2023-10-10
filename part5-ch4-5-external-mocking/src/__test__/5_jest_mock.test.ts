import * as calculator from '../utils/calculator'
jest.mock('../utils/calculator');

const doAdd = (a: number, b: number) => {
    return calculator.add(a, b)
}

test("Mock function", () => {
    const result = doAdd(1, 2)
    expect(calculator.add).toHaveBeenCalledWith(1, 2)
    expect(result).toBeUndefined() // add 함수에 대한 mock 구현체가 없다.
})