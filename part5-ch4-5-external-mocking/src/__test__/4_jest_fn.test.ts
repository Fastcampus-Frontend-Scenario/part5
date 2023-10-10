import * as calculator from '../utils/calculator'

const doAdd = (a: number, b: number) => {
    return calculator.add(a, b)
}
// Cannot assign to 'add' because it is a read-only property.ts(2540)
// calculator.add = jest.fn()

test("Mock function", () => {
    doAdd(1, 2)
    expect(calculator.add).toHaveBeenCalledWith(1, 2)
})