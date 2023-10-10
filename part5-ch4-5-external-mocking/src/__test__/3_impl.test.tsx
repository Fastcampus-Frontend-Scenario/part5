test("mock Implementation", () => {
    const mockFn = jest.fn()
    mockFn.mockImplementation((a: boolean) => !a)
    expect(mockFn(true)).toBe(false)
})

test("mock Implementation once", () => {
    const mockFn = jest.fn()
    mockFn.mockImplementationOnce((a: boolean) => !a)
    expect(mockFn(true)).toBe(false)
    // 위에서 구현체가 한번 사용, 이후 초기화 (undefined 반환)
    expect(mockFn(true)).toBe(undefined)
})