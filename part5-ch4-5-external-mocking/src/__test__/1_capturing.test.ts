test("Capturing mock function", () => {
    const mockFn = jest.fn()
    const result = mockFn()

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledTimes(1)

    const result2 = mockFn('foo')
    const result3 = mockFn({
        foo: 'foo',
        bar: 'bar'
    })
    expect(mockFn).toHaveBeenCalledTimes(3) // mock 함수는 3번 호출됨
    // 혹은
    expect(mockFn.mock.calls).toHaveLength(3) // mock 함수 호출 history의 length
    expect(mockFn.mock.calls[0]).toHaveLength(0) // 첫번쨰 호출의 argument length = 0
    expect(mockFn.mock.calls[1][0]).toBe('foo') // 두번째 호출의 argument 검증
    expect(mockFn.mock.calls[2][0]).toMatchObject(
        expect.objectContaining({
            foo: 'foo',
            bar: 'bar'
        })
    ) // 세번째 함수 호출의 argument 체크
})