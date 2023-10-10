import def, * as calculator from '../utils/calculator'
jest.mock('../utils/calculator');


test("Mock function", () => {
    console.log(def())
})

test("typed Mock function", () => {
    // const mockedCalculator = jest.mocked(calculator);
    // 혹은 `jest.Mocked<Source>` 를 이용
    const mockedCalculator = calculator as jest.Mocked<typeof calculator>

    // mockedCalculator.add.mockReturnValue('a') // error
    mockedCalculator.add.mockReturnValue(0)
    expect(calculator.add(1,2)).toBe(0)
})