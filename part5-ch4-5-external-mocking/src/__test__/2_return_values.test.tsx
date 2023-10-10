test("Return value of mock function", () => {
    const mockFn = jest.fn()

    expect(mockFn()).toBeUndefined() // mock function의 return value를 설정하지 않았으므로 undefined
    
    mockFn.mockReturnValue(1)
    expect(mockFn()).toBe(1) // mock function의 return value는 1

    mockFn.mockReturnValueOnce(2)
    expect(mockFn()).toBe(2) // mock function의 return value는 1
    // return value는 1, Once로 설정된 값이 한번 반환된 이후에는
    // 이전의 반환 값을 다시 반환한다
    expect(mockFn()).toBe(1) 
})

test("Return value of chained mock function", () => {
    const mockFn = jest.fn()
    mockFn
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(3)
        .mockReturnValueOnce(4)
    expect(mockFn()).toBe(1)
    expect(mockFn()).toBe(2)
    expect(mockFn()).toBe(3)
    expect(mockFn()).toBe(4)
    expect(mockFn()).toBe(undefined)
})